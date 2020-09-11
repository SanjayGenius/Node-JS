module.exports = (sequelize, type) => {
    return sequelize.define('features', {
        feature_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ref_name: type.STRING,
        menu_name : type.STRING,
        description : type.STRING,
        created_date : type.DATE,
        created_by : type.INTEGER,
        modified_date : type.DATE,
        modified_by : type.INTEGER,
        end_date : type.DATE
    },{
        timestamps: false
    })
    
};