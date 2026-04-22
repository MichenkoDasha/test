import {faker} from '@faker-js/faker';

export class todoXmlBuilder {
    withTitle(title){
        this.title = title || faker.lorem.words(3) || `XML Todo ${Date.now()}`;
        return this;
    }
     withDoneStatus(status){
        this.doneStatus = status === undefined || status === null 
        ? false 
        : typeof status === 'string' 
            ? status.toLowerCase() === 'true' 
            : Boolean(status);
    return this;
    }

    withDescription(description){
        this.description = description || faker.lorem.sentence() || `XML description ${Date.now()}`;
        return this;
    }
 
    build() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<todo>
    <title>${this.title}</title>
    <doneStatus>${this.doneStatus}</doneStatus>
    <description>${this.description}</description>
</todo>`;
    }
}
