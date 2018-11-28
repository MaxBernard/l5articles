<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Response;
use App\Article;
use App\Http\Resources\Article as ArticleResource;
use DB;
use URL;

class ArticleController extends Controller
{
    private $PostYear;
    private $PostMonth;

    protected $rules = [
        'title'     => 'required',
        'body'      => 'required',
        'category'  => 'required',
        'tag'       => 'required',
        'cover_image' => 'image|mimes:jpeg,png,jpg,gif,svg|nullable|max:2048'
    ];

    /**
     * filterPosts method
     *
     * @return $posts filtered by Month & Year and paginated
     */
    protected function filterArticles($rows=25)
    {
        global $PostYear, $PostMonth;

        if (isset($_GET['Post_year'])) {
            $PostYear = $_GET['Post_year'];
        }
        else {
            $PostYear = date('Y');
        }

        $PostMonth = date('m');
        if (isset($_GET['Post_month'])) {
            $PostMonth = $_GET['Post_month'];
        }
        else {
            $PostMonth = date('m');
        }

        //dump('PostYear: ' . $PostYear . ' PostMonth: ' . $PostMonth);

        return Article::where('year', '=', $PostYear)->where('month', '=', $PostMonth)
            ->orderBy('created_at', 'desc')->paginate($rows);
    }
    
    protected function toResp( $obj ) {
      return $obj;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        global $PostYear, $PostMonth;

        $PostYear = date('Y');
        $PostMonth = date('m');

        // Get articles
        $articles = Article::orderBy('id', 'desc')->paginate(25);

        $links = [
          'first'=>'http://l5articles.purotracker.com/api/articles?page=' . (int)$articles->firstItem(),
          'last'=>'http://l5articles.purotracker.com/api/articles?page=' . (int)$articles->lastPage(),
          'prev'=>$articles->previousPageUrl(),
          'next'=>$articles->nextPageUrl()
        ];

        $meta=[
          'current_page'=>(int)$articles->currentPage(),
          'from'=>(int)$articles->firstItem(),
          'last_page'=>(int)$articles->lastPage(),
          'path'=>'http://l5articles.purotracker.com/api/articles',
          'per_page'=>(int)$articles->perPage(),
          'to'=>(int)$articles->lastItem(),
          'total'=>(int)$articles->total()
        ];

        //$articles = $this->filterArticles(100);
        $categories = DB::table('categories')->pluck('name','id');
        $tags = DB::table('tags')->pluck('name','id');

        // Return collection of articles as a resource
        $p = ArticleResource::collection($articles);
        //return $p;
        return ([
          'data' => $p, 
          'links'=>$links, 'meta'=>$meta,
          'PostYear'=>$PostYear, 'PostMonth'=>$PostMonth,
          'categories'=>$categories, 'tags'=>$tags
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $article = $request->isMethod('put') ? Article::findOrFail($request->article_id) : new Article;

        //$article->id = $request->input('article_id');
        $article->user_id   = $request->user_id;    // auth()->user()->id
        $article->year      = date("Y");
        $article->month     = date("m");
        $article->category  = $request->category;
        $article->tag       = $request->tag;
        $article->title     = $request->title;
        $article->body      = $request->body;

        if($article->save()) {
            return new ArticleResource($article);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        // Get article
        //$id = $request->id;
        $article = Article::findOrFail($id);

        // Return single article as a resource
        return new ArticleResource($article);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $article = Article::findOrFail($id);
      $article->category  = $request->category;
      $article->tag       = $request->tag;
      $article->title     = $request->title;
      $article->body      = $request->body;

      if($article->save()) {
        return new ArticleResource($article);
    }
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Get article
        $article = Article::findOrFail($id);

        if($article->delete()) {
            return new ArticleResource($article);
        }    
    }
}
