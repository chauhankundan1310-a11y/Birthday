// Central registry of illustration assets — keeps import paths in one place.
import nightSkyTop from '../assets/backgrounds/night_sky_top.png';
import nightSkyBottom from '../assets/backgrounds/night_sky_bottom.png';
import pinkSkyTop from '../assets/backgrounds/pink_sky_top.png';
import pinkCloudsBottom from '../assets/backgrounds/pink_clouds_bottom.png';
import creamPartyTop from '../assets/backgrounds/cream_party_top.png';
import glowingPurpleBottom from '../assets/backgrounds/glowing_purple_bottom.png';

import teddyBalloons from '../assets/characters/teddy_balloons.png';
import teddyCrown from '../assets/characters/teddy_crown.png';
import teddyHeart from '../assets/characters/teddy_heart.png';
import bunny from '../assets/characters/bunny.png';

import strawberryCake from '../assets/cakes/strawberry_birthday_cake.png';
import chocolateCake from '../assets/cakes/chocolate_birthday_cake.png';

import pinkGiftBox from '../assets/gifts/pink_gift_box.png';
import purpleGiftBox from '../assets/gifts/purple_gift_box.png';
import pinkGiftBottom from '../assets/gifts/pink_gift_bottom.png';

import heartSealEnvelope from '../assets/envelopes/heart_seal_envelope.png';
import birthdayNoteCard from '../assets/cards/birthday_note_card.png';

import polaroidMemories from '../assets/gallery/polaroid_memories.png';

import bunting from '../assets/decorations/bunting.png';
import camera from '../assets/decorations/camera.png';
import confettiDecor from '../assets/decorations/confetti.png';
import flowerBouquet from '../assets/decorations/flower_bouquet.png';
import heartStarStickers from '../assets/decorations/heart_and_star_stickers.png';
import heartBalloons from '../assets/decorations/heart_balloons.png';
import pinkBow from '../assets/decorations/pink_bow.png';

export const ART = {
  backgrounds: {
    nightSkyTop,
    nightSkyBottom,
    pinkSkyTop,
    pinkCloudsBottom,
    creamPartyTop,
    glowingPurpleBottom,
  },
  characters: {
    teddyBalloons,
    teddyCrown,
    teddyHeart,
    bunny,
  },
  cakes: {
    strawberry: strawberryCake,
    chocolate: chocolateCake,
  },
  gifts: {
    pinkGiftBox,
    purpleGiftBox,
    pinkGiftBottom,
  },
  envelope: heartSealEnvelope,
  card: birthdayNoteCard,
  gallery: polaroidMemories,
  decorations: {
    bunting,
    camera,
    confetti: confettiDecor,
    flowerBouquet,
    heartStarStickers,
    heartBalloons,
    pinkBow,
  },
};
