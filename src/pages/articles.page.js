export class ArticlesPage {
    constructor(page) {
        this.page = page;
        this.articlesTitle = page.getByRole('heading');
    }
    getArticlesTitle(){  
        return this.articlesTitle;
    }
}