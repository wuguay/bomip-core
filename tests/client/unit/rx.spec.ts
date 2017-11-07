import * as ngCore from '@angular/core';
import {chai} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import { BehaviorSubject, ConnectableObservable,
    Observable, ReplaySubject, Subject
} from 'rxjs';
import {log, isRx, isArrayRx, castRx} from '@bomip/core';

const faker = require('faker');
const fp = require('lodash/fp');

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // random contact card containing many properties

const should = chai.should();
const expect = chai.expect;



describe('ReactiveX Language Functions', function () {

    describe("Reactive Functions", function () {
        const randomObject = randomCard;
        const randomString = randomName;
        const randomArray = [randomName, randomCard];

        it("isRx: Check if object is a ReactiveX function", function () {
            const subject = new BehaviorSubject(randomName);
            const observable = subject.asObservable();
            const arrayRx = [subject, observable];
            const invalidRx = [undefined, 'rx'];

            expect(isArrayRx(arrayRx)).to.have.same.members([true, true]);
            expect(isRx(subject)).to.equal(true);
            expect(isRx(observable)).to.equal(true);
            expect(isRx(arrayRx)).to.equal(false);
            expect(isRx(invalidRx)).to.equal(false);
        });

        it("castRx: Cast string | object | arrays to an observable", function () {
            const subject = new BehaviorSubject(randomName);

            const rxSubject = castRx(subject);
            const rxString = castRx(randomString);
            const rxArray = castRx(randomArray);
            const rxObject = castRx(randomObject);

            expect(isRx(rxSubject)).to.equal(true);
            expect(isRx(rxString)).to.equal(true);
            expect(isRx(rxObject)).to.equal(true);
            expect(isRx(rxArray)).to.equal(true);
            expect(isRx(randomArray)).to.equal(false);
        });


    });

});