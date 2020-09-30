export default ((limit) => {
    let indexes: { [key: number]: number } = {};

    for (let i = 0; i < limit; i++) {
        indexes[i] = limit - i - 1;
    }

    return indexes;
})(24);
