import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const callError = (error, functionName = 'Unknown Function') => {
    if (!error) return;

    console.error(`🚨 [ERROR] Function: ${functionName}, Message: ${error.message}, Code: ${error.code || 'N/A'}`);
};

const applyFilters = (query, filters = {}) => {
    Object.entries(filters).forEach(([key, condition]) => {
        const [operator, value] = condition;
        if (typeof query[operator] === 'function') {
            query = query[operator](key, value);
        } else {
            console.warn(`🚨 Unknown filter operator: ${operator}`);
        }
    });
    return query;
};

export const supabaseAPI = {
    getList: async (table, columns = "*") => {
        try{
            const { data, error } = await supabase
            .from(table)
            .select(columns);
            if (error) throw error;
            return data;
        }catch(err){
            callError(err, "getList");
            return null;
        }
    },

    getData: async (table, columns = "*", filters = {}) => {
        let query = supabase.from(table).select(columns);
        query = applyFilters(query, filters);
        try{
            const { data, error } = await query;
            if (error) throw error;
            return data;
        }catch(err){
            callError(err, "getData");
            return null;
        }
    },

    setData: async (table, newData) => {
        
        //입력력값이 비어있으면 오류출력력
        if (!newData || (Array.isArray(newData) && newData.length === 0)) {
            console.warn("🚨 No data provided to insert");
            return null;
        }

        try{
            const { data, error } = await supabase
            .from(table)
            .insert(newData);

            if (error) throw error;
            return data;
        }catch(err){
            callError(err, "setData");
            return null;
        }
    },

    updateData: async (table, newData, filters = {}) => {

        //입력력값이 비어있으면 오류출력력
        if (!newData || (Array.isArray(newData) && newData.length === 0)) {
            console.warn("🚨 No data provided to insert");
            return null;
        }

        let query = supabase.from(table).update(newData);
        query = applyFilters(query, filters);

        try{
            const { data, error } = await query;
            if (error) throw error;
            return data;
        }catch(err){
            callError(err, "updateData");
            return null;
        }
    },

    deleteData: async (table, filters = {}) => {
        let query = supabase.from(table).delete();
        query = applyFilters(query, filters);

        try {
            const { data, error } = await query;
            if (error) throw error;
            return data;
        } catch (err) {
            callError(err, "deleteData");
            return null;
        }
    }
}