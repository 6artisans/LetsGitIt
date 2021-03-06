class SearchController < ApplicationController
    def index
        @repos = Search::Repos.call(params.slice(:q, :page, :order, :language).merge(access_token: session[:github_oauth_token]))
        render json: {repos: @repos}.to_json
    end
end
