const countryModel = require('../../models/country.model');
const cityModel = require('../../models/city.model');
const stateModel = require('../../models/state.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    getAllCountrys: async () => {
        const data = await countryModel.find({status:"Active"});
        return data;
    },
    getStateByCountry: async (id) => {
       const query = [
           {
               $match: {
                   country_id: new ObjectId(id),
                   status: "Active",
               },
           },
           {
               $project: {
                   _id: 1,
                   name: 1,
               },
           },
       ];
       const data = stateModel.aggregate(query);
       return data;
    },
    getCityByState: async(id) => {

        const query = [
            {
                $match: {
                    state_id: new ObjectId(id),
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                },
            },
        ];

        const data = await cityModel.aggregate(query);
        return data;
    }
};