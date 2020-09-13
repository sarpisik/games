export default function shortenString(name: string) {
    return name.length > 8 ? name.slice(0, 8).concat('...') : name;
}
