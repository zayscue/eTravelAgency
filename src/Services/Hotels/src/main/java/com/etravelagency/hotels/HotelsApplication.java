package com.etravelagency.hotels;

import com.etravelagency.hotels.data.HotelRepository;
import com.etravelagency.hotels.data.SeedData;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

@SpringBootApplication
public class HotelsApplication {

	public static MongoClient Client;
	public static MongoDatabase Database;

	public static void main(String[] args) {
		Client = MongoClients.create();
		CodecRegistry pojoCodecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
		Database = Client.getDatabase("eTravelAgencyHotels").withCodecRegistry(pojoCodecRegistry);
		MongoCursor<String> collectionNamesIterator = Database.listCollectionNames().iterator();
		boolean hotelsCollectionExists = false;
		while(collectionNamesIterator.hasNext()) {
			String collectionName = collectionNamesIterator.next();
			if(collectionName.equals(HotelRepository.COLLECTION_NAME)) {
				hotelsCollectionExists = true;
				break;
			}
		}
		if(!hotelsCollectionExists) {
			Database.createCollection(HotelRepository.COLLECTION_NAME);
			HotelRepository repository = new HotelRepository(Database);
			for(int i = 0; i < SeedData.G_HOTELS.size(); i++) {
				repository.insert(SeedData.G_HOTELS.get(i));
			}
		}
		SpringApplication.run(HotelsApplication.class, args);
	}
}
