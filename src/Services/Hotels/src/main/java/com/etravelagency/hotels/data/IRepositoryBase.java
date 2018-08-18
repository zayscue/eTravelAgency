package com.etravelagency.hotels.data;

import java.util.List;

import org.bson.types.ObjectId;

public interface IRepositoryBase<TEntity> {
    List<TEntity> getAll();
    TEntity getById(ObjectId id);
    void insert(TEntity entity);
}