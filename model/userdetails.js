module.exports = (sequelize, type) => {
    return sequelize.define('user_details', {
        user_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name : type.STRING,
        role_id: type.INTEGER,
        login_id : type.STRING,
        password : type.STRING,
        contact_number : type.STRING,
        address : type.STRING,
        city : type.STRING,
        state : type.STRING,
        country : type.STRING,
        zipcode : type.STRING,
        active_status : type.INTEGER,
        created_date : type.DATE,
        created_by : type.INTEGER,
        modified_date : type.DATE,
        modified_by : type.INTEGER,
        end_date : type.DATE
    },{
        timestamps: false
    })
};
