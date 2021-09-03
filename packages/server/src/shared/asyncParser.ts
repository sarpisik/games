export default function asyncParser<Data>(data: Data) {
    return new Promise<Data>((resolve, reject) => {
        setImmediate(() => {
            try {
                const stringfy = JSON.stringify(data);

                setImmediate(() => {
                    try {
                        resolve(JSON.parse(stringfy));
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    });
}
