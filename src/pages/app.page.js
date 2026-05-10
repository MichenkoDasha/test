import { MainPage, RegisterPage, YourFeedPage, PublishPage, ArticlePage, ArticlesPage } from './index';

export class App{
constructor(page){
    this.page = page;
    this.main = new MainPage(page);       
    this.regPage = new RegisterPage(page); 
    this.yourfeed = new YourFeedPage(page);
    this.publish = new PublishPage(page);
    this.articleName = new ArticlesPage(page);
    this.editArticles = new ArticlePage(page);
}
}