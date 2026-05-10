export class YourFeedPage {
    constructor(page) {
        this.page = page;
        this.profileName = page.getByRole('navigation');
    }
    getProfileName(){  
        return this.profileName;
    }
}