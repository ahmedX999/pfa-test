const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userType: {
        type: String,
        required: true,
        enum: ['donar', 'hospital', 'organization', 'admin'],
    },
    name: {
        type: String,
        required: function () {
            if (this.userType == 'admin' || this.userType == 'donar') {
                return true;
            }
            return false;
        },

    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.userType == 'hospital') {
                return true;
            }
            return false;
        },

    },
    organizationName: {
        type: String,
        required: function () {
            if (this.userType == 'organization') {
                return true;
            }
            return false;
        },

    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
     
    },
    website: {
        type: String,
        required: function () {
            if (this.userType == 'hospital' || this.userType == 'organization') {
                return true;
            }
            return false;
        },

    },

    address: {
        type: String,
        required: function () {
            if (this.userType == 'hospital' || this.userType == 'organization') {
                return true;
            }
            return false;
        },

    },


});

module.exports = mongoose.model("users",userSchema);