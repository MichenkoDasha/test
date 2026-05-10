export class ArticlePage {
    constructor(page) {
        this.page = page;
        this.pageArt = page;

        
        this.home = page.getByRole('link', { name: ' Home' });
        this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
        this.commentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentText = page.locator('.card-text');
        
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();

        this.editArtButton = page.getByRole('link', { name: 'Edit Article' });
        this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
        this.EditButton = page.getByRole('button', { name: 'Update Article' });

        this.articlesTitle = page.getByRole('heading');

        this.counterLocator = page.locator('.counter >> nth=1');

    }

    async addComment(commentArt) {
        const { comment } = commentArt;

        await this.commentInput.click();
        await this.commentInput.fill(comment);
        await this.commentButton.click();
    }

    async getCountArt(){  
      const counterText = await this.counterLocator.innerText();
        return parseInt(counterText.split(' ')[2]);
    }

    async deleteArticle() {
        
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
            });
            await this.deleteButton.click();
    }

    async editArticle(articleEdit) {
        const { titleEdit, descriptionEdit, bodyEdit, tagsEdit } = articleEdit;

        await this.editArtButton.first().click();
        await this.titleInput.click();
        await this.titleInput.fill(titleEdit);
        await this.descriptionInput.click();
        await this.descriptionInput.fill(descriptionEdit);
        await this.bodyInput.click();
        await this.bodyInput.fill(bodyEdit);
        await this.tagsInput.click();
        await this.tagsInput.fill(tagsEdit);
        await this.EditButton.click();
    }
    
    getArticlesTitle(){  
        return this.articlesTitle;
    }

     async clickHome() {
        await this.home.click();
        
    }

    
}
