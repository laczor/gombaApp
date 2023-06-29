export function Location({
    date = Date.now(),
    ...rest
}){
    return {
        date: Date.now(),
        ...rest
    };
};


export function isLocation(location){
    const errors = [];
    const properties = ['id', 'lat', 'lng', 'name', 'date'];
    const keys = Object.keys(location);
    properties.forEach(prop => {
        if(!keys.includes(prop)) errors.push(`The location missing the following property [--${prop}--]]\n for this entry ${JSON.stringify(location)}`)
    });
    return errors.length === 0 ? true : errors;
}