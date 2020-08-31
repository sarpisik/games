import { PLAYERS } from '@shared-types/backgammon';
import { calculateTriangleIsBlocked } from '../calculateTriangleIsBlocked';

describe('calculateTriangleIsBlocked', () => {
    it('should return triangle is blocked', () => {
        expect(
            calculateTriangleIsBlocked(PLAYERS.WHITE, [PLAYERS.BLACK, 2])
        ).toBeTrue();
    });

    it("should return triangle is unblocked when triangle has opponent's one point", () => {
        expect(
            calculateTriangleIsBlocked(PLAYERS.WHITE, [PLAYERS.BLACK, 1])
        ).toBeFalse();
    });

    it('should return triangle is unblocked when it is empty', () => {
        expect(
            calculateTriangleIsBlocked(PLAYERS.WHITE, [PLAYERS.NONE, 0])
        ).toBeFalse();
    });

    it('should return triangle is unblocked when it is taken by the same player', () => {
        expect(
            calculateTriangleIsBlocked(PLAYERS.WHITE, [PLAYERS.WHITE, 1])
        ).toBeFalse();
    });
});
