'use strict'
const axios = require("axios");
const expect = require('chai').expect;
var WOQL = require('../lib/woql');

/*const allClassQuery=`select([v('Class'), v('Label'), v('Comment'),
                    v('Abstract')],(t(v('Class'), rdf/type,
                    owl/'Class', dg/schema), opt(t(v('Class'), rdfs/label,
                    v('Label'), dg/schema)), opt(t(v('Class'), rdfs/comment,
                    v('Comment'), dg/schema)), opt(t(v('Class'), dcog/tag,
                    v('Abstract'), dg/schema))))`;*/

describe('woql query', function () {

	 it('check database document id',function(done){
      global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

      const woqlObject=WOQL.limit(2).start(0);
      woqlObject.execute(global.client);
	   //WOQLClient.prototype.select = function (qurl, woql, opts)
	   //global.client.select()

       done();
     })
})
//someText = someText.replace(/(\r\n|\n|\r)/gm, "");

describe('pre-roll queries', function () {

  it('check the getEverything method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, {"quad": ["v:Subject", "v:Predicate", "v:Object", "db:Graph" ] } ] } ] };

    expect(woqlObject.getEverything("Graph").json()).to.eql(jsonObj);

  })

  it('check the getAllDocuments method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);
    //console.log(woqlObject.getAllDocuments().json());
    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [ { "triple": [ "v:Document", "rdf:type", "v:Type"] }, { "sub": ["v:Type", "tcs:Document" ] } ] } ] } ] };

    expect(woqlObject.getAllDocuments().json()).to.eql(jsonObj);

  })

  it('check the documentMetadata method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [ { "triple": [ "v:ID", "rdf:type", "v:Class"] }, { "sub": ["v:Class", "tcs:Document" ] },
    { "opt": [ { "triple": [ "v:ID",
                             "rdfs:label",
                             "v:Label"] } ] },
    { "opt": [ { "triple": [ "v:ID",
                             "rdfs:comment",
                             "v:Comment"] } ] },
    { "opt": [ { "quad": [ "v:Class",
                           "rdfs:label",
                           "v:Type",
                           "db:schema"] } ] },
    { "opt": [ { "quad": [ "v:Class",
                           "rdfs:comment",
                           "v:Type_Comment",
                           "db:schema"] } ] }
   ] } ] } ] };

    expect(woqlObject.documentMetadata().json()).to.eql(jsonObj);

  })

  it('check the concreteDocumentClasses method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [ { "sub": [ "v:Class", "tcs:Document"] },
                  { "not": [ { "quad": [
                          "v:Class",
                          "tcs:tag",
                          "tcs:abstract",
                          "db:schema"] } ] },
                  { "opt": [ { "quad": [
                       "v:Class",
                       "rdfs:label",
                       "v:Label",
                       "db:schema"] } ] },
                  { "opt": [ { "quad": [
                       "v:Class",
                       "rdfs:comment",
                       "v:Comment",
                       "db:schema"] } ] }
                         ] } ] } ] };

    expect(woqlObject.concreteDocumentClasses().json()).to.eql(jsonObj);

  })

  it('check the propertyMetadata method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
      {  "or": [
                { "quad": [
                    "v:Property",
                    "rdf:type",
                    "owl:DatatypeProperty",
                    "db:schema" ] },
                { "quad": [
                    "v:Property",
                    "rdf:type",
                    "owl:ObjectProperty",
                    "db:schema" ] } ] },
      { "opt": [
                { "quad": [
                    "v:Property",
                    "rdfs:range",
                    "v:Range",
                    "db:schema" ] } ] },
      {  "opt": [
         { "quad": [
              "v:Property",
              "rdf:type",
              "v:Type",
              "db:schema" ] }
          ] },
      { "opt": [
          { "quad": [
                "v:Property",
                "rdfs:label",
                "v:Label",
                "db:schema" ] }
          ] },
      { "opt": [
          { "quad": [
                "v:Property",
                "rdfs:comment",
                "v:Comment",
                "db:schema" ] }
         ] },
       { "opt": [
          { "quad": [
                "v:Property",
                "rdfs:domain",
                "v:Domain",
                "db:schema" ] }
         ] }
                 ] } ] } ] };

    expect(woqlObject.propertyMetadata().json()).to.eql(jsonObj);

  })

  it('check the elementMetadata method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "quad": [ "v:Element", "rdf:type", "v:Type", "db:schema"] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "tcs:tag",
                          "v:Abstract",
                          "db:schema"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "rdfs:label",
                          "v:Label",
                          "db:schema"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "rdfs:comment",
                          "v:Comment",
                          "db:schema"
                  ] } ] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "rdfs:subClassOf",
                          "v:Parent",
                          "db:schema"
                  ] } ] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "rdfs:domain",
                          "v:Domain",
                          "db:schema"
                  ] } ] },
        {  "opt": [ { "quad": [
                          "v:Element",
                          "rdfs:range",
                          "v:Range",
                          "db:schema"
                  ] } ] }
                       ] } ] } ] };

    expect(woqlObject.elementMetadata().json()).to.eql(jsonObj);

  })

  it('check the classMetadata method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "quad": [ "v:Element", "rdf:type", "owl:Class", "db:schema"] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "rdfs:label",
                          "v:Label",
                          "db:schema"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "rdfs:comment",
                          "v:Comment",
                          "db:schema"
                  ] } ] },
        { "opt": [ { "quad": [
                          "v:Element",
                          "tcs:tag",
                          "v:Abstract",
                          "db:schema"
                 ] } ] }
                       ] } ] } ] };

    expect(woqlObject.classMetadata().json()).to.eql(jsonObj);

  })

  it('check the getDataOfClass method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "triple": [ "v:Document", "rdf:type", {"@language": "en", "@value": "ClassID"}] },
        { "opt": [ { "triple": [
                          "v:Document",
                          "v:Property",
                          "v:Value"
                 ] } ] }
                       ] } ] } ] };

    expect(woqlObject.getDataOfClass("ClassID").json()).to.eql(jsonObj);

  })

  it('check the getDataOfProperty method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);
    //console.log(woqlObject.getAllDocuments().json());
    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "triple": [ "v:Document", "scm:PropID", "v:Value"] },
        { "opt": [ { "triple": [
                          "v:Document",
                          "rdfs:label",
                          "v:Label"
                 ] } ] }
                       ] } ] } ] };

    expect(woqlObject.getDataOfProperty("PropID").json()).to.eql(jsonObj);

  })

  it('check the documentProperties method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);

    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "triple": [ "doc:docid", "v:Property", "v:Property_Value"] },
        { "opt": [ { "quad": [
                          "v:Property",
                          "rdfs:label",
                          "v:Property_Label",
                          "db:schema"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:Property",
                          "rdf:type",
                          "v:Property_Type",
                          "db:schema"
                 ] } ] }
                       ] } ] } ] };

    expect(woqlObject.documentProperties("docid").json()).to.eql(jsonObj);

  })

  it('check the getDocumentConnections method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);
    //console.log(JSON.stringify(woqlObject.getDocumentConnections("docid").json()));
    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "isa": [ "v:Entid", "v:Enttype"] },
        { "sub": [ "v:Enttype", "tcs:Document"] },
        { "opt": [ { "triple": [
                          "v:Entid",
                          "rdfs:label",
                          "v:Label"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:Enttype",
                          "rdfs:label",
                          "v:Class_Label",
                          "db:schema"
                 ] } ] }
               ],
    "or": [
        { "triple": [
                "doc:docid",
                "v:Outgoing",
                "v:Entid"] },
        { "triple": [
                "v:Entid",
                "v:Incoming",
                { "@language": "en", "@value": "docid" }] },
          ] } ] } ] };

    expect(woqlObject.getDocumentConnections("docid").json()).to.eql(jsonObj);

  })

  it('check the getInstanceMeta method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);
    //console.log(woqlObject.getAllDocuments().json());
    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "triple": [ "doc:docid", "rdf:type", "v:InstanceType"] },
        { "opt": [ { "triple": [
                          "doc:docid",
                          "rdfs:label",
                          "v:InstanceLabel"
                 ] } ] },
        { "opt": [ { "triple": [
                          "doc:docid",
                          "rdfs:comment",
                          "v:InstanceComment"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:InstanceType",
                          "rdfs:label",
                          "v:ClassLabel",
                          "db:schema"
                 ] } ] }
                       ] } ] } ] };

    expect(woqlObject.getInstanceMeta("docid").json()).to.eql(jsonObj);

  })

  it('check the simpleGraphQuery method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);
    const jsonObj={ limit: [ 2, { start: [ 0, { "and": [
        { "triple": [ "v:Source", "v:Edge", "v:Target"] },
        { "isa": [ "v:Source", "v:Source_Class"] },
        { "sub": [ "v:Source_Class", "tcs:Document"] },
        { "isa": [ "v:Target", "v:Target_Class"] },
        { "sub": [ "v:Target_Class", "tcs:Document"] },
        { "opt": [ { "triple": [
                          "v:Source",
                          "rdfs:label",
                          "v:Source_Label"
                 ] } ] },
        { "opt": [ { "triple": [
                          "v:Source",
                          "rdfs:comment",
                          "v:Source_Comment"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:Source_Class",
                          "rdfs:label",
                          "v:Source_Type",
                          "db:schema"
                 ] } ] },
        { "opt": [ { "quad": [
                         "v:Source_Class",
                         "rdfs:comment",
                         "v:Source_Type_Comment",
                         "db:schema"
                  ] } ] },
        { "opt": [ { "triple": [
                          "v:Target",
                          "rdfs:label",
                          "v:Target_Label"
                 ] } ] },
        { "opt": [ { "triple": [
                          "v:Target",
                          "rdfs:comment",
                          "v:Target_Comment"
                 ] } ] },
        { "opt": [ { "quad": [
                          "v:Target_Class",
                          "rdfs:label",
                          "v:Target_Type",
                          "db:schema"
                 ] } ] },
        { "opt": [ { "quad": [
                         "v:Target_Class",
                         "rdfs:comment",
                         "v:Target_Type_Comment",
                         "db:schema"
                  ] } ] },
        { "opt": [ { "quad": [
                          "v:Edge",
                          "rdfs:label",
                          "v:Edge_Type",
                          "db:schema"
                 ] } ] },
        { "opt": [ { "quad": [
                         "v:Edge",
                         "rdfs:comment",
                         "v:Edge_Type_Comment",
                         "db:schema"
                  ] } ] }
                       ] } ] } ] };

    expect(woqlObject.simpleGraphQuery().json()).to.eql(jsonObj);

  })

});

describe('woql query object', function () {

  it('check the setVocabulary method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);
    woqlObject.setVocabulary("vocab");
    //console.log(woqlObject.getAllDocuments().json());
    //done();
    //expect(woqlObject.setVocabulary("vocab")).to.eql(jsonObj);

  })

  it('check the loadVocab method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObject=WOQL.limit(2).start(0);
    //console.log(woqlObject.getAllDocuments().json());

    woqlObject.loadVocab(global.client);
    //expect(woqlObject.loadVocab(global.client).json()).to.eql(jsonObj);

  })

  it('check the isPaged method',function(){
    global.sandbox.stub(axios, "get").returns(Promise.resolve({status:200, data: {}}));

    const woqlObjectTrue=WOQL.limit(2).start(0);
    const woqlObjectFalse=WOQL.select("V1", WOQL.triple("a", "b", "c"));
    console.log(woqlObjectFalse.isPaged());

    expect(woqlObjectTrue.isPaged()).to.eql(true);
    expect(woqlObjectFalse.isPaged()).to.eql(false);

  })

});
