export default function calculateWindowDimension() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Use availheight to avoid keyboard height in mobile devices
    const orientation = windowWidth / window.screen.availHeight;
    const isLandscape = orientation > 1;

    return { isLandscape, windowHeight, windowWidth, orientation };
}
