import useImage from 'use-image';

// Points
import pointDark from '../../../../../assets/point_dark.png';
import pointLight from '../../../../../assets/point_light.png';

// Dices
import dice1 from '../../../../../assets/dice_1.png';
import dice2 from '../../../../../assets/dice_2.png';
import dice3 from '../../../../../assets/dice_3.png';
import dice4 from '../../../../../assets/dice_4.png';
import dice5 from '../../../../../assets/dice_5.png';
import dice6 from '../../../../../assets/dice_6.png';

// Buttons
import startBg from '../../../../../assets/start_bg.png';
import startBtn from '../../../../../assets/start_btn.png';
import surrenderBg from '../../../../../assets/surrender_bg.png';
import surrenderBtn from '../../../../../assets/surrender_btn.png';
import resumeBg from '../../../../../assets/resume_bg.png';
import resumeBtn from '../../../../../assets/resume_btn.png';
import undoBg from '../../../../../assets/undo_bg.png';
import undoBtn from '../../../../../assets/undo_btn.png';

type Statuses = ReturnType<typeof useImage>[1];
type El = ReturnType<typeof useImage>[0];

export function useLoadAssets() {
    const [pLight, sLight] = useImage(pointLight);
    const [pDark, sDark] = useImage(pointDark);
    const [sDice1, eDice1] = useImage(dice1);
    const [sDice2, eDice2] = useImage(dice2);
    const [sDice3, eDice3] = useImage(dice3);
    const [sDice4, eDice4] = useImage(dice4);
    const [sDice5, eDice5] = useImage(dice5);
    const [sDice6, eDice6] = useImage(dice6);
    const [sStartBg, eStartBg] = useImage(startBg);
    const [sStartBtn, eStartBtn] = useImage(startBtn);
    const [sSurrenderBg, eSurrenderBg] = useImage(surrenderBg);
    const [sSurrenderBtn, eSurrenderBtn] = useImage(surrenderBtn);
    const [sResumeBg, eResumeBg] = useImage(resumeBg);
    const [sResumeBtn, eResumeBtn] = useImage(resumeBtn);
    const [sUndoBg, eUndoBg] = useImage(undoBg);
    const [sUndoBtn, eUndoBtn] = useImage(undoBtn);

    const assets = [
        [pLight, pDark],
        [sDice1, sDice2, sDice3, sDice4, sDice5, sDice6],
        [
            sResumeBg,
            sResumeBtn,
            sStartBg,
            sStartBtn,
            sSurrenderBg,
            sSurrenderBtn,
            sUndoBg,
            sUndoBtn,
        ],
    ];

    const statuses = [
        sLight,
        sDark,
        eStartBg,
        eStartBtn,
        eSurrenderBg,
        eSurrenderBtn,
        eResumeBg,
        eResumeBtn,
        eUndoBg,
        eUndoBtn,
        eDice1,
        eDice2,
        eDice3,
        eDice4,
        eDice5,
        eDice6,
    ];

    const allSuccess = statuses.every(loaded);
    const someFailed = statuses.some(failed);

    return [assets, allSuccess, someFailed] as const;
}

export function allElements(
    elements: El[][] | El[]
): elements is Array<Array<Exclude<El, undefined>>> {
    return Array.isArray(elements[0])
        ? allElements(elements[0] as El[])
        : (elements as El[]).every(Boolean);
}

function loaded(status: Statuses) {
    return status === 'loaded';
}

function failed(status: Statuses) {
    return status === 'failed';
}
