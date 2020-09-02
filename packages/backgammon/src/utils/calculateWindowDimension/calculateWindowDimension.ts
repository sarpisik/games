export default function calculateWindowDimension() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const orientation = windowWidth / windowHeight;
    const isLandscape = orientation > 1;

    return { isLandscape, windowHeight, windowWidth, orientation };
}
