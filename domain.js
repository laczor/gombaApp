export function Location({
    date = Date.now(),
    ...rest
}){
    return {
        date: Date.now(),
        ...rest
    };
};
