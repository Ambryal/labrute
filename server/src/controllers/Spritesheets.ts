import {
  Animation, BruteWithBodyColors, getBruteVisuals,
} from '@labrute/core';
import { PrismaClient } from '@labrute/prisma';
import { Resvg } from '@resvg/resvg-js';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import Spritesmith from 'spritesmith';
import Vynil from 'vinyl';
import { Worker } from 'worker_threads';
import getFrame, { FRAMES } from '../animations/getFrame.js';
import auth from '../utils/auth.js';
import Env from '../utils/Env.js';
import sendError from '../utils/sendError.js';
import translate from '../utils/translate.js';

const Spritesheets = {
  getImage: (prisma: PrismaClient) => async (req: Request<{
    brute: string,
  }>, res: Response) => {
    try {
      if (!req.params.brute) {
        throw new Error('Invalid parameters');
      }

      const bruteId = +req.params.brute || 0;
      let brute: BruteWithBodyColors | null;

      // Handle old getter with name instead of id
      if (Number.isNaN(+req.params.brute)) {
        brute = await prisma.brute.findFirst({
          where: { name: req.params.brute, deletedAt: null },
          include: {
            body: true,
            colors: true,
          },
        });

        if (!brute) {
          // Brute was probably deleted
          brute = await prisma.brute.findFirst({
            where: { name: req.params.brute },
            include: {
              body: true,
              colors: true,
            },
          });

          if (!brute) {
            throw new Error('Brute not found');
          }
        }
      } else {
        brute = await prisma.brute.findFirst({
          where: { id: bruteId, deletedAt: null },
          include: {
            body: true,
            colors: true,
          },
        });

        if (!brute) {
          // Brute was probably deleted
          brute = await prisma.brute.findFirst({
            where: { id: bruteId },
            include: {
              body: true,
              colors: true,
            },
          });

          if (!brute) {
            throw new Error('Brute not found');
          }
        }
      }

      const visuals = getBruteVisuals(brute);

      // Get brute spritesheet
      const spritesheet = await prisma.bruteSpritesheet.findUnique({
        where: {
          // eslint-disable-next-line max-len
          gender_longHair_lowerRightArm_rightHand_upperRightArm_rightShoulder_rightFoot_lowerRightLeg_upperRightLeg_leftFoot_lowerLeftLeg_pelvis_upperLeftLeg_tummy_torso_head_leftHand_upperLeftArm_lowerLeftArm_leftShoulder_skinColor_skinShade_hairColor_hairShade_primaryColor_primaryShade_secondaryColor_secondaryShade_accentColor_accentShade: visuals,
        },
        select: { image: true },
      });

      if (spritesheet) {
        res.header('Content-Type', 'image/png').send(spritesheet.image);
      } else {
        // Load default spritesheet
        const defaultSpritesheet = await fetch(`${Env.SELF_URL}/images/game/${brute.gender}-brute.png`);

        // Send default spritesheet
        res.header('Content-Type', 'image/png').send(Buffer.from(await defaultSpritesheet.arrayBuffer()));
      }
    } catch (error) {
      sendError(res, error);
    }
  },
  getJson: (prisma: PrismaClient) => async (req: Request<{
    brute: string,
  }>, res: Response) => {
    try {
      if (!req.params.brute) {
        throw new Error('Invalid parameters');
      }

      const bruteId = +req.params.brute || 0;
      let brute: BruteWithBodyColors | null;

      // Handle old getter with name instead of id
      if (Number.isNaN(+req.params.brute)) {
        brute = await prisma.brute.findFirst({
          where: { name: req.params.brute, deletedAt: null },
          include: {
            body: true,
            colors: true,
          },
        });

        if (!brute) {
          // Brute was probably deleted
          brute = await prisma.brute.findFirst({
            where: { name: req.params.brute },
            include: {
              body: true,
              colors: true,
            },
          });

          if (!brute) {
            throw new Error('Brute not found');
          }
        }
      } else {
        brute = await prisma.brute.findFirst({
          where: { id: bruteId, deletedAt: null },
          include: {
            body: true,
            colors: true,
          },
        });

        if (!brute) {
          // Brute was probably deleted
          brute = await prisma.brute.findFirst({
            where: { id: bruteId },
            include: {
              body: true,
              colors: true,
            },
          });

          if (!brute) {
            throw new Error('Brute not found');
          }
        }
      }

      const visuals = getBruteVisuals(brute);

      // Get brute spritesheet
      const spritesheet = await prisma.bruteSpritesheet.findUnique({
        where: {
          // eslint-disable-next-line max-len
          gender_longHair_lowerRightArm_rightHand_upperRightArm_rightShoulder_rightFoot_lowerRightLeg_upperRightLeg_leftFoot_lowerLeftLeg_pelvis_upperLeftLeg_tummy_torso_head_leftHand_upperLeftArm_lowerLeftArm_leftShoulder_skinColor_skinShade_hairColor_hairShade_primaryColor_primaryShade_secondaryColor_secondaryShade_accentColor_accentShade: visuals,
        },
        select: { json: true },
      });

      if (spritesheet) {
        res.header('Content-Type', 'application/json').send(spritesheet.json);
      } else {
        // Load default spritesheet
        const defaultSpritesheet = await fetch(`${Env.SELF_URL}/images/game/${brute.gender}-brute.json`);

        // Send default spritesheet
        res.header('Content-Type', 'application/json').send(Buffer.from(await defaultSpritesheet.arrayBuffer()));
      }
    } catch (error) {
      sendError(res, error);
    }
  },
  getAnimation: (prisma: PrismaClient) => async (req: Request<{
    animation: Animation,
    model: 'male' | 'female',
    brute: string,
  }>, res: Response) => {
    try {
      // Get brute colors and body
      const brute = await prisma.brute.findFirst({
        where: {
          name: req.params.brute,
          deletedAt: null,
        },
        include: {
          body: true,
          colors: true,
        },
      });

      if (!brute) {
        throw new Error('Brute not found');
      }

      if (!brute.body || !brute.colors) {
        throw new Error('Brute body or colors not found');
      }

      const {
        params: {
          animation,
          model,
        },
      } = req;

      const frames: Vynil.BufferFile[] = [];

      for (let i = 0; i < FRAMES[model][animation].length; i += 1) {
        // Get frame getter
        const frameGetter = getFrame(animation, model, i);

        if (!frameGetter) {
          throw new Error(`No frame for ${animation} ${model} ${i}`);
        }

        // Convert SVG to PNG
        const resvg = new Resvg(frameGetter({
          body: brute.body,
          colors: brute.colors,
        }));
        const pngData = resvg.render();
        const png = pngData.asPng();

        // Create vinyl
        const frame = new Vynil({
          contents: png,
          path: `${animation}-${model}-${i + 1}.png`,
        });

        frames.push(frame);
      }

      // Create spritesheet
      Spritesmith.run({ src: frames }, (err, result) => {
        if (err) {
          throw err;
        }
        res.header('Content-Type', 'image/png').send(result.image);
      });
    } catch (error) {
      sendError(res, error);
    }
  },
  getFrame: (prisma: PrismaClient) => async (req: Request<{
    animation: Animation,
    model: 'male' | 'female',
    brute: string,
    frame: string,
  }>, res: Response) => {
    try {
      // Auth to limit access to this endpoint
      // await auth(prisma, req);

      // Get brute colors and body
      const brute = await prisma.brute.findFirst({
        where: {
          name: req.params.brute,
          deletedAt: null,
        },
        include: {
          body: true,
          colors: true,
        },
      });
      if (!brute) {
        throw new Error('Brute not found');
      }

      if (!brute.body || !brute.colors) {
        throw new Error('Brute body or colors not found');
      }

      const {
        params: {
          animation,
          model,
          frame,
        },
      } = req;

      // Get frame getter
      const frameGetter = getFrame(animation, model, +frame - 1);

      if (!frameGetter) {
        throw new Error(`No frame for ${animation} ${model} ${frame}`);
      }

      res.header('Content-Type', 'image/svg+xml').send(frameGetter({
        body: brute.body,
        colors: brute.colors,
      }));
    } catch (error) {
      sendError(res, error);
    }
  },
  regenerate: (prisma: PrismaClient) => async (req: Request, res: Response) => {
    try {
      const user = await auth(prisma, req);

      if (!user.admin) {
        throw new Error(translate('unauthorized', user));
      }

      // Get all brutes
      const brutes = await prisma.brute.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          body: true,
          colors: true,
        },
      });

      // Regenerate spritesheets
      // eslint-disable-next-line no-new
      new Worker('./lib/workers/regenerateSpritesheets.js', {
        workerData: brutes,
      });

      res.send({
        message: 'Regeneration started',
      });
    } catch (error) {
      sendError(res, error);
    }
  },
};

export default Spritesheets;
