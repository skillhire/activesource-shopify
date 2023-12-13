import Front1 from "assets/placements/front-01.svg";
import Front2 from "assets/placements/front-02.svg";
import Front3 from "assets/placements/front-03.svg";
import Front4 from "assets/placements/front-04.svg";
import Front5 from "assets/placements/front-05.svg";
import Front6 from "assets/placements/front-06.svg";
import Front7 from "assets/placements/front-07.svg";
import Front8 from "assets/placements/front-08.svg";
import Front9 from "assets/placements/front-09.svg";
import Front10 from "assets/placements/front-10.svg";
import Back1 from "assets/placements/back-01.svg";
import Back2 from "assets/placements/back-02.svg";
import Back3 from "assets/placements/back-03.svg";
import Back4 from "assets/placements/back-04.svg";
import Back5 from "assets/placements/back-05.svg";
/*
  Warehouse print codes:  
  CF – front
  FB – back
  LC- left chest (limited to a 4x4 print size)
  BN – back of neck
*/

export const PLACEMENTS = {
  front: [
    {
      id: "F01",
      code: "CF",
      title: "Full Front",
      dimensions: "14'x17.5'",
      previewSrc: Front1,
      top: '20%',
      left: '20%',
      height: '60%',
      width: '60%',
    },
    {
      id: "F02",
      code: "CF",
      title: "Center Chest",
      dimensions: "14'x10'",
      previewSrc: Front2,
      top: '20%',
      left: '20%',
      height: '30%',
      width: '60%',
    },
    {
      id: "F03",
      code: "CF",
      title: "Center Chest",
      dimensions: "14'x4'",
      previewSrc: Front3,
      top: '20%',
      left: '20%',
      height: '10%',
      width: '60%',
    },
    {
      id: "F04",
      code: "CF",
      title: "Center Chest",
      dimensions: "14'x2.5'",
      previewSrc: Front4,
      top: '20%',
      left: '20%',
      height: '8%',
      width: '60%',
    },
    {
      id: "F05",
      code: "CF",
      title: "Center Chest",
      dimensions: "14'x2'",
      previewSrc: Front5,
      top: '20%',
      left: '20%',
      height: '5%',
      width: '60%',
    },
    {
      id: "F06",
      code: "CF",
      title: "Center Chest",
      dimensions: "14'x1'",
      previewSrc: Front6,
      top: '20%',
      left: '20%',
      height: '4%',
      width: '60%',
    },
    {
      id: "F07",
      code: "LC",
      title: "Left Chest",
      dimensions: "4.5'x4.5'",
      previewSrc: Front7,
      top: '20%',
      left: '60%',
      height: '20%',
      width: '20%',
    },
    {
      id: "F08",
      code: "LC",
      title: "Left Chest",
      dimensions: "4.5'x3.5'",
      previewSrc: Front8,
      top: '20%',
      left: '60%',
      height: '15%',
      width: '20%',
    },
    {
      id: "F09",
      code: "LC",
      title: "Left Chest",
      dimensions: "3.5'x1.5'",
      previewSrc: Front9,
      top: '20%',
      left: '60%',
      height: '10%',
      width: '15%',
    },
    {
      id: "F10",
      code: "LC",
      title: "Left Chest",
      dimensions: "3'x1'",
      previewSrc: Front10,
      top: '20%',
      left: '60%',
      height: '10%',
      width: '10%',
    },
  ],
  back: [
    {
      id: "B01",
      code: "FB",
      title: "Full Back",
      dimensions: "14'x17.5'",
      previewSrc: Back1,
      top: "20%",
      left: "20%",
      height: "60%",
      width: "60%",
    },
    {
      id: "B02",
      code: "FB",
      title: "Center Back",
      dimensions: "14'x10'",
      previewSrc: Back2,
      top: "20%",
      left: "20%",
      height: "50%",
      width: "60%",
    },
    {
      id: "B03",
      code: "FB",
      title: "Center Back",
      dimensions: "14'x4'",
      previewSrc: Back3,
      top: "20%",
      left: "20%",
      height: "40%",
      width: "60%",
    },
    {
      id: "B04",
      code: "FB",
      title: "Center Back",
      dimensions: "4'x4'",
      previewSrc: Back4,
      top: "20%",
      left: "40%",
      height: "20%",
      width: "20%",
    },
    {
      id: "B05",
      code: "FB",
      title: "Back of Neck",
      dimensions: "4'x1'",
      previewSrc: Back5,
      top: "20%",
      left: "40%",
      height: "5%",
      width: "20%",
    },
  ],
};
