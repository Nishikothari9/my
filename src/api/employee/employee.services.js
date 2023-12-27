const employeeModel = require('../../models/employee.model')

module.exports = {
    getAllEmployee: async (req, res) => {
        const data = await employeeModel.find();
        return data;
    },
    addNewEmployee: async (data) => {
        const addEmployee = await employeeModel(data).save();
        return addEmployee;
    },
    updateEmployee: async (id, data) => {
        const updateData = await employeeModel.findByIdAndUpdate(id, { $set: data });
        return updateData;
    },
    getEmployeeById: async (id) => {
        const employeeDetail = await employeeModel.findById(id);
        return employeeDetail;
    },
    getEmployeeByEmail: async (email) => {
        const employeeData = await employeeModel.find({ email: email });
        return employeeData;
    },
    getAllHR: async () => {
        const hrData = await employeeModel.aggregate([
            {
              '$match': {
                'userRole': 'hr', 
                'status': 'Joined'
              }
            }, {
              '$addFields': {
                'label': {
                  '$concat': [
                    '$firstName', ' ', '$lastName'
                  ]
                }, 
                'code': '$_id'
              }
            }, {
              '$project': {
                'label': 1, 
                'code': 1, 
                '_id': 0, 
                'email': 1, 
                'phone': 1, 
                'designation': 1, 
                'userRole': 1
              }
            }
          ]);
        return hrData;
    },
    getAllTL: async () => {
        const hrData = await employeeModel.aggregate([
            {
              '$match': {
                'userRole': 'tl', 
                'status': 'Joined'
              }
            }, {
              '$addFields': {
                'label': {
                  '$concat': [
                    '$firstName', ' ', '$lastName'
                  ]
                }, 
                'code': '$_id'
              }
            }, {
              '$project': {
                'label': 1, 
                'code': 1, 
                '_id': 0, 
                'email': 1, 
                'phone': 1, 
                'designation': 1, 
                'userRole': 1
              }
            }
          ]);
        return hrData;
    },
    getAllPM: async () => {
        const hrData = await employeeModel.aggregate([
            {
              '$match': {
                'userRole': 'pm', 
                'status': 'Joined'
              }
            }, {
              '$addFields': {
                'label': {
                  '$concat': [
                    '$firstName', ' ', '$lastName'
                  ]
                }, 
                'code': '$_id'
              }
            }, {
              '$project': {
                'label': 1, 
                'code': 1, 
                '_id': 0, 
                'email': 1, 
                'phone': 1, 
                'designation': 1, 
                'userRole': 1
              }
            }
          ]);
        return hrData;
    },
    getEmployee: async () => {
        const hrData = await employeeModel.aggregate([
            {
              '$match': {
                'userRole': 'employee', 
                'status': 'Joined'
              }
            }, {
              '$addFields': {
                'label': {
                  '$concat': [
                    '$firstName', ' ', '$lastName'
                  ]
                }, 
                'code': '$_id'
              }
            }, {
              '$project': {
                'label': 1, 
                'code': 1, 
                '_id': 0, 
                'email': 1, 
                'phone': 1, 
                'designation': 1, 
                'userRole': 1
              }
            }
          ]);
        return hrData;
    },
    modifyEmployeeLeave: async(employeeId,leaveCount) => {
        const updateData = await employeeModel.findByIdAndUpdate(employeeId, {
            $set: { pendingLeaves:leaveCount},
        });
        return updateData;
    }
};