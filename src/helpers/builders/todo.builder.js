import {faker} from '@faker-js/faker';

export class todoBuilder {
    withTitle(title){
        this.title = (title !== undefined && title !== null) 
            ? title 
            : faker.animal.bear() + '-test-' + Math.floor(Math.random() * 1000);
        return this;
    }
     withDoneStatus(status){
        this.doneStatus = (status !== undefined && status !== null) 
      ? status 
      : faker.datatype.boolean();
    return this;
    }

    withDescription(description){
        this.description = (description !== undefined && description !== null) 
            ? description 
            : faker.word.conjunction(5);
        return this;
    }
 
    build(priority = {}){ 
        const result = {...this, ...priority};
        return result;
    }
}