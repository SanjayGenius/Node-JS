module.exports = (sequelize, type) => {
    return sequelize.define('user_roles', {
        role_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: type.STRING,
        description : type.STRING,
        feature_ids : type.STRING,
        created_date : type.DATE,
        created_by : type.INTEGER,
        modified_date : type.DATE,
        modified_by : type.INTEGER,
        end_date : type.DATE
    },{
        timestamps: false
    })
    
};