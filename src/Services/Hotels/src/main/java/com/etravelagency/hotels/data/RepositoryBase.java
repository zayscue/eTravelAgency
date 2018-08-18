package com.etravelagency.hotels.data;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.Block;
import com.mongodb.client.model.Filters;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.types.ObjectId;

public abstract class RepositoryBase<TEntity> implements IRepositoryBase<TEntity> {
    private MongoDatabase database;
    private MongoCollection<TEntity> collection;

    public RepositoryBase(MongoDatabase database, String collectionName, Class<TEntity> type) {
        if(database == null)
            throw new NullPointerException("database");
        if(collectionName == null)
            throw new NullPointerException("collectionName");
        if(type == null)
            throw new NullPointerException("type");
        this.database = database;
        this.collection = database.getCollection(collectionName, type);
    } 

    public List<TEntity> getAll() {
        List<TEntity> results = new ArrayList<TEntity>();
        Block<TEntity> addToResults = new Block<TEntity>() {
            @Override
            public void apply(final TEntity entity) {
                results.add(entity);
            }
        };
        this.collection.find().forEach(addToResults);
        return results;
    }

    public TEntity getById(ObjectId id) {
        TEntity entity = this.collection.find(Filters.eq("id", id)).first();
        return entity;
    }

    public void insert(TEntity entity) {
        this.collection.insertOne(entity);
    }
    
}