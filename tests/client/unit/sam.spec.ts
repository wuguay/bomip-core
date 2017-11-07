import 'reflect-metadata';
import 'zone.js/dist/zone.js';
import 'zone.js/dist/long-stack-trace-zone';
import {chai} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import { BehaviorSubject, ConnectableObservable,
    Observable, ReplaySubject, Subject
} from 'rxjs';
import {log, isBlank, castRx, ActionAbstract, ModelAbstract, StateAbstract, runWhen} from '@bomip/core';
import {Injectable, Injector} from '@angular/core';

const faker = require('faker');
const fp = require('lodash/fp');

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // random contact card containing many properties

const should = chai.should();
const expect = chai.expect;

class TalkAction extends ActionAbstract {
    constructor(public line: string) {
        super();
    }
}
class BarkAction extends ActionAbstract {
    constructor(public woof: string) {
        super();
    }
}

export class TestAction {
    static apply(model: any, action: any) {
        return ActionAbstract.apply(this, model, action);
    }

    static TalkAction = class extends TalkAction {
        static run(model: any, action: any): any {
            console.log('TalkAction');

            model.words = action.line;
            return model;
        }
    };

    static BarkAction = class extends BarkAction {
        static run(model: any, action: any): any {
            console.log('BarkAction');

            model.words = action.woof;
            return model;
        }
    };
}

export class TestModel extends ModelAbstract<any> {
    data = true;
    words = 'My Words';

    constructor(initialModel?: any) {
        super();
        this.init(initialModel);
    }
}

export class TestState extends StateAbstract {
    collection$ = Observable.interval(1000);
    sample$ = this.collection$.sample(Observable.interval(2000));

    constructor(public model: ModelAbstract<any>,
                public injector: Injector) {
        super(model, injector);
        this.init(model);
    }

    apply(model: any, action: any) {
        return isBlank(action) ? model : TestAction.apply(model, action);
    }

    run(a: any): any {
        // return super.actions(a);
    }

    init(model: ModelAbstract<any>) {
        //Execute action based on logic
        // this.sample$.subscribe(c=> {
        //     //Execute logic when collection$ changes
        //     console.log(c);
        // });

        super.init(model);
    }

    representation(model: ModelAbstract<any>) {
        //Logic to prepare view and display it
        runWhen(this.ready(model), () => {
            // console.log('representation');
            //     this.view.counting(model);

        }, this);
    }

    nextAction(model: ModelAbstract<any>): any {  //Next predicate action for continuous process
        //Execute action based on logic
        runWhen(this.ready(model), () => {
            // console.log('nextAction');

            //Need to present the model after changes but need logic not to execute next action
            //model.present(model)
        }, this);
    }


    ngOnDestroy() {
        super.ngOnDestroy();
    }

}

describe('State Action Model (SAM) Platform', function () {

    describe("Reactive Functions", function () {
        const randomObject = randomCard;
        const randomString = randomName;
        const randomArray = [randomName, randomCard];

        // it("model: Check if model can be initiated with default values", function () {
        //     const model = new TestModel({data: false});
        //     expect(isRx(model.data)).to.equal(false);
        // });
        //
        // it("state: Check if state can be initiated", function () {
        //     const model = new TestModel({data: false});
        //     const state = new TestState(model, null);
        //     const started = fp.get('model.started', state);
        //     expect(started).to.equal(true);
        // });


        it("action: Apply action to change the model and state", function () {
            const model = new TestModel({data: false});
            const state = new TestState(model, null);
            const started = fp.get('model.started', state);
            const speech = 'Hello Chip!';
            const woof = 'Woof Woof!!';

            model.rx.subscribe((m: any)=> {
                // console.log(m.words);  //(From model initiation) My words => (TalkAction) Hello chip
            });

            state.actions(new TalkAction(speech));
            expect(model.words).to.equal(speech);


            state.actions(new BarkAction(woof));
            expect(model.words).to.equal(woof);
console.log(model.words);


        });


    });

});