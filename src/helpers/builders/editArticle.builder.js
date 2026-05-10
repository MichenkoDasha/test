import {faker} from '@faker-js/faker';

export class EditArticleBuilder {
    withTitleEdit(){
        this.titleEdit = faker.animal.bear() + '-test-' + Math.floor(Math.random() * 1000);
        return this;
}
     withDescriptionEdit(){
        this.descriptionEdit = faker.animal.bear();
        return this;
}

    withBodyEdit(){
        this.bodyEdit = faker.word.conjunction(100);
        return this;
}

    withtagsEdit(){
        this.tagsEdit = 'test';
        return this;
}   
    build(){ 
        const result = {...this};
        return result;
    }
}