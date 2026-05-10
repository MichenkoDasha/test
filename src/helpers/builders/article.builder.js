import {faker} from '@faker-js/faker';

export class ArticleBuilder {
    withTitle(){
        this.title = faker.animal.bear() + '-test-' + Math.floor(Math.random() * 1000);
        return this;
}
     withDescription(){
        this.description = faker.animal.bear();
        return this;
}

    withBody(){
        this.body = faker.word.conjunction(50);
        return this;
}

    withtags(){
        this.tags = 'test';
        return this;
}   
    build(){ 
        const result = {...this};
        return result;
    }
}

