export class PublishPage {
    constructor(page) {
        this.page = page;

        this.editButton = page.getByRole('link', { name: 'New Article' });
        this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });

    }

    async publishArticle(article) {
        const { title, description, body, tags } = article;

        await this.editButton.click();
        await this.titleInput.click();
        await this.titleInput.fill(title);
        await this.descriptionInput.click();
        await this.descriptionInput.fill(description);
        await this.bodyInput.click();
        await this.bodyInput.fill(body);
        await this.tagsInput.click();
        await this.tagsInput.fill(tags);
        await this.publishButton.click();
    }

    /*async gotoPablish() {
        await this.signupLink.click('https://realworld.qa.guru/#/editor/');
    }
    async open() {
        await this.page.goto('https://realworld.qa.guru/#/editor/');
    }*/
}