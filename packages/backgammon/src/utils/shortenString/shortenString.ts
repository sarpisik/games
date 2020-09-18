export default function shortenString(name: string, limit = 8) {
    return name.length > limit ? name.slice(0, limit).concat('...') : name;
}
