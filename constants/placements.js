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

export const HOODIE_PLACEMENTS = {
  front: [    
    {
      id: "F02",
      code: "CF",
      title: "Center Chest",
      dimensions: '14"x10"',
      previewSrc: Front2,
      top: "20.41%",
      left: "21.77%",
      height: "40.61%",
      width: "56.86%",
      widthInches: 14,
      heightInches: 10
    },
    {
      id: "F03",
      code: "CF",
      title: "Center Chest",
      dimensions: '14"x4"',
      previewSrc: Front3,
      top: "30.52%",
      left: "21.77%",
      height: "16.25%",
      width: "56.86%",
      widthInches: 14,
      heightInches: 4
    },
    {
      id: "F04",
      code: "CF",
      title: "Center Chest",
      dimensions: '14"x2.5"',
      previewSrc: Front4,
      top: "30.32%",
      left: "21.6%",
      height: "10.15%",
      width: "56.86%",
      widthInches: 14,
      heightInches: 2.5
    },
    {
      id: "F05",
      code: "CF",
      title: "Center Chest",
      dimensions: '14"x2"',
      previewSrc: Front5,
      top: "26.95%",
      left: "21.77%",
      height: "8.12%",
      width: "56.86%",
      widthInches: 14,
      heightInches: 2
    },
    {
      id: "F06",
      code: "CF",
      title: "Center Chest",
      dimensions: '14"x1"',
      previewSrc: Front6,
      top: "24.06%",
      left: "21.68%",
      height: "4.06%",
      width: "56.86%",
      widthInches: 14,
      heightInches: 1
    },
    {
      id: "F07",
      code: "LC",
      title: "Left Chest",
      dimensions: '4.5"x4.5"',
      previewSrc: Front7,
      top: "24.47%",
      left: "58.15%",
      height: "18.28%",
      width: "18.28%",
      widthInches: 4.5,
      heightInches: 4.5
    },
    {
      id: "F08",
      code: "LC",
      title: "Left Chest",
      dimensions: '3.5"x3.5"',
      previewSrc: Front8,
      top: "20.41%",
      left: "58.17%",
      height: "14.21%",
      width: "14.21%",
      widthInches: 3.5,
      heightInches: 3.5      
    },
    {
      id: "F09",
      code: "LC",
      title: "Left Chest",
      dimensions: '4.5"x4.5"',
      previewSrc: Front9,
      top: "24.47%",
      left: "58.14%",
      height: "18.28%",
      width: "18.28%",
      widthInches: 4.5,
      heightInches: 4.5
    },
    {
      id: "F10",
      code: "LC",
      title: "Left Chest",
      dimensions: '3"x1"',
      previewSrc: Front10,
      top: "24.47%",
      left: "64.24%",
      height: "4.06%",
      width: "12.18%",
      widthInches: 3,
      heightInches: 1
    },
  ],
  back: [
    {
      id: "B01",
      code: "FB",
      title: "Full Back",
      dimensions: '14"x17.5"',
      previewSrc: Back1,
      top: "13.34%",
      left: "21.54%",
      height: "71.41%",
      width: "57.03%",
      widthInches: 14,
      heightInches: 17.5
    },
    {
      id: "B02",
      code: "FB",
      title: "Center Back",
      dimensions: '14"x8"',
      previewSrc: Back2,
      top: "13.34%",
      left: "21.54%",
      height: "32.59%",
      width: "57.03%",
      widthInches: 14,
      heightInches: 8
    },
    {
      id: "B03",
      code: "FB",
      title: "Center Back",
      dimensions: '14"x5"',
      previewSrc: Back3,
      top: "13.34%",
      left: "21.54%",
      height: "20.37%",
      width: "57.03%",
      widthInches: 14,
      heightInches: 5
    },
    {
      id: "B04",
      code: "FB",
      title: "Back Neck",
      dimensions: '6"x6"',
      previewSrc: Back4,
      top: "13.34%",
      left: "37.83%",
      height: "24.44%",
      width: "24.44%",
      widthInches: 6,
      heightInches: 6
    },
    {
      id: "B05",
      code: "FB",
      title: "Back of Neck",
      dimensions: '6"x2.5"',
      previewSrc: Back5,
      top: "13.34%",
      left: "37.83%",
      height: "10.18%",
      width: "24.44%",
      widthInches: 6,
      heightInches: 2.5
    },
  ],
};

export const SHIRT_PLACEMENTS = {
  ...HOODIE_PLACEMENTS,
  front: [
    {
      id: "F01",
      code: "CF",
      title: "Full Front",
      dimensions: '14"x17.5"',
      previewSrc: Front1,
      top: "20.15%",
      left: "21.75%",
      height: "70.91%",
      width: "56.57%",
      widthInches: 14,
      heightInches: 17.5
    },
    ...HOODIE_PLACEMENTS["front"]  
  ]
}

export const BAG_PLACEMENT = {  
  id: "T01",
  code: "CF",
  top: "25.63%",
  left: "29.69%",
  height: "48.74%",
  width: "40.61%",
  widthInches: 10,
  heightInches: 8
}
  