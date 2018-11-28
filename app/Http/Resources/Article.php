<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use Illuminate\Http\Resources\Json\PaginatedResourceResponse;

class Article extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

      return [
        'id' => $this->id,
        'user_id' => $this->user_id,
        'year' => $this->year,
        'month' => $this->month,
        'category' => $this->category,
        'tag' => $this->tag,
        'title' => $this->title,
        'body' => $this->body,
		    'created_at'=> $this->created_at
      ];
    }

    public function with($request) {
      return [
        'version' => '1.0.2',
        'author_url' => url('http://purotracker.com')
      ];
    }
}
