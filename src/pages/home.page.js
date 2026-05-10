export class HomePage {
    constructor(page) {
        this.page = page;
        this.pageArt = page;
        this.allFeedButton = page.getByRole('button', { name: 'Global Feed' });
        this.articleLink = page.locator('h1').first();
        this.favoriteButton = page.getByRole('button', { name: 'Favorite' }).first();
        
        
    }
    async clickArticle(article){  
        await this.allFeedButton.click();
        await this.pageArt.goto('https://realworld.qa.guru/#/article/ + ${article}');
    }
    async clickFavoritButton() {
        await this.favoriteButton.click();
    }
}