import 'reflect-metadata';
import 'zone.js/dist/zone.js';
import 'zone.js/dist/long-stack-trace-zone';
import * as ngCore from '@angular/core';
import {chai} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import {isBlank, assignInPath, getKeys, verify, isTrueProperty, mergeObjects, omitObjectBy, runHas, runWhen} from '@bomip/core';

const faker = require('faker');
const fp = require('lodash/fp');

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // random contact card containing many properties

const should = chai.should();
const expect = chai.expect;

const log = (e: any) => {
    console.log(e);
    return e;
};

describe('Core Language Functions', function () {


    describe("Collections Functions", function () {
        const randomObject = randomCard;
        const randomString = randomName;
        const randomArray = [randomName, randomCard];

        it("getKeys: Get keys from string | object | array of strings | objects", function () {
            const objectKeys = getKeys(randomObject);
            const stringKeys = getKeys(randomString);
            const arrayKeys = getKeys(randomArray);

            expect(objectKeys).to.have.same.members(fp.keys(randomObject));
            expect(stringKeys).to.equal(randomString);
            expect(arrayKeys).to.have.same.members(fp.flatten([randomName, objectKeys]));
        });

        it("verify: Verify keys from string | object | array of strings | objects", function () {
            const validObjectKeys = getKeys(randomObject);
            const validStringKeys = getKeys(randomString);
            const validArrayKeys = getKeys(randomArray);

            expect(verify(fp.head(validObjectKeys), validObjectKeys)).to.equal(true);
            expect(verify(['name', 'username'], validArrayKeys)).to.equal(true);
            expect(verify(randomString, validStringKeys)).to.equal(true);
        });


    });


    describe("Objects Functions", function () {
        it("assignInPath: Combine two objects starting from path from source", function () {
            let query = {_id: {$in: [3]}, name: 'crystal'};
            let b = {original: true, select: {name: 'bob', _id: {$in: [4]}}};
            const result = {original: true, select: {name: 'crystal', _id: {$in: [4, 3]}}};
            expect(assignInPath('select', query, b)).to.deep.equal(result);
        });
          it("mergeObjects: Combine two objects.  If object values are array then they are appended.", function () {
              const s = {_id: {$in: [1], qty: 5}};
              const o = {_id: {$in: [2]}};
              const u = {_id: {$in: [2], qty: undefined}};
              const simpleResult = {_id: {$in: [2, 1], qty: 5}};
              const nullResult = {_id: {$in: [1, 2]}};
              expect(mergeObjects(o, s)).to.deep.equal(simpleResult);
              expect(mergeObjects(s, u)).to.deep.equal(nullResult);
        });

          it("omitObjectBy: Deeply omit objects by iteratee.", function () {
              const obj = {_id: {$in: {a: null, b: 2}, key: 1}};
              const result = {_id:{$in:{b:2},key:1}};
              expect(omitObjectBy(fp.isNil, obj)).to.deep.equal(result);
        });


    });

   describe("Strings Functions", function () {
        it("converts the basic colors", function () {



            // const onString = 'on';
            // const trueString = 'true';
            // const trueBoolean = true;
            // const falseString = 'false';
            //
            // expect(isTrueProperty(onString)).to.equal(true);
            // expect(isTrueProperty(trueString)).to.equal(true);
            // expect(isTrueProperty(trueBoolean)).to.equal(true);
            // expect(isTrueProperty(falseString)).to.equal(false);
        });
    });


    describe("Angular Functions", function () {
        it("isTrueProperty: Check if template property is true", function () {
            const onString = 'on';
            const trueString = 'true';
            const trueBoolean = true;
            const falseString = 'false';

            expect(isTrueProperty(onString)).to.equal(true);
            expect(isTrueProperty(trueString)).to.equal(true);
            expect(isTrueProperty(trueBoolean)).to.equal(true);
            expect(isTrueProperty(falseString)).to.equal(false);
        });
    });


    describe("Functional Programming", function () {
        it("runHas: Run block if all values exists and else block if undefined exists", function () {
            const pass = 'pass';
            const fail = 'fail';
            const validValue = randomCard;
            const validArrayValue = [randomCard, randomName];
            const invalidArrayValue = [randomCard, randomName, undefined];
            const fn = (v: any) => runHas(v, () => pass, () => fail, this);
            const elseFn = (v: any) => runHas(v, () => pass, this);

            expect(fn(validValue)).to.equal('pass');
            expect(fn(validArrayValue)).to.equal('pass');
            expect(fn(invalidArrayValue)).to.equal('fail');

            expect(elseFn(invalidArrayValue)).to.equal(undefined);
        });

        it("runWhen: Run block if all predicates are true and else block if undefined exists", function () {
            const pass = 'pass';
            const fail = 'fail';
            const trueValue = true;
            const falseValue = false;
            const trueFunction = () => trueValue;
            const falseFunction = () => falseValue;
            const trueArrayFunction = [trueFunction, trueFunction];
            const falseArrayFunction = [randomCard, randomName, undefined];

            const fn = (p: any) => runWhen(p, () => pass, () => fail, this);

            expect(fn(trueFunction)).to.equal('pass');
            expect(fn(falseFunction)).to.equal('fail');
            expect(fn(trueArrayFunction)).to.equal('pass');
            expect(fn(falseArrayFunction)).to.equal('fail');
        });


    });


    // beforeEach(function () {
    //     component = new MeteorReactive();
    //     zoneSpy = sinon.spy(Zone.current, 'run');
    // });
    //
    // afterEach(() => {
    //     zoneSpy.restore();
    // });
    //
    // describe('implements', function () {
    //     it('ngOnDestroy', function () {
    //         should.exist(component.ngOnDestroy);
    //     });
    // });

    // describe('MeteorReactive.autorun', () => {
    //     let autorunStub;
    //     beforeEach(function () {
    //         autorunStub = sinon.stub(Meteor, 'autorun');
    //     });
    //
    //     afterEach(function () {
    //         autorunStub.restore();
    //     });
    //
    //     describe('testing zone', () => {
    //         let ngZone, ngZoneSpy;
    //
    //         beforeEach(function () {
    //             ngZone = Zone.current.fork({name: 'angular'});
    //             ngZoneSpy = sinon.spy(ngZone, 'run');
    //         });
    //
    //         afterEach(function () {
    //             ngZoneSpy.restore();
    //         });
    //
    //         it('should run Angular 2 zone after the Meteor.autorun callback', (done) => {
    //             autorunStub = autorunStub.yields();
    //
    //             let callback = sinon.spy();
    //             let args = [callback];
    //
    //             ngZone.run(() => {
    //                 component = new MeteorReactive();
    //                 component.autorun(...args);
    //             });
    //
    //             zoneRunScheduler.onAfterRun(ngZone, () => {
    //                 expect(ngZoneSpy.calledTwice).to.be.true;
    //                 expect(callback.calledOnce).to.be.true;
    //                 done();
    //             });
    //         });
    //     });
    // });


});