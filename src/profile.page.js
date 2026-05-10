export class ProfilePage {
    constructor(page) {
        this.page = page;
       this.profileName = page.locator('.user-pic');
       this.profile = page.getByRole('link', { name: ' Profile' });
        
        
    }
    
    async clickProfile() {
        await this.profileName.click();
        await this.profile.click();
    }
}