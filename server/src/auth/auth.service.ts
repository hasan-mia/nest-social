import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { jwtSecret } from 'utils/constants';
import { AuthDto } from './dto/auth.dto';
import { ResetDto } from './dto/reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  // private transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'hasanrafi68@gmail.com',
  //     pass: 'prithilahasan23',
  //   },
  // }),
  // ================
  //    Sign Up    //
  //=================
  async signup(dto: AuthDto) {
    const { email, password } = dto;
    // check if user exists
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }
    // generate hash password
    const hashPassword = await this.hashPassword(password);
    // save new user data
    await this.prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    // const foundUser = await this.prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    // });

    // const token = await this.generateSignToken({
    //   userId: foundUser.id.toString(),
    //   email: foundUser.email,
    // });

    // if (!token) {
    //   throw new ForbiddenException('Could not signin');
    // }

    // res.cookie('token', token, {});

    return { message: 'Signup Successfully' };
  }

  // ================
  //    Sign In    //
  //=================
  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const compareSuccess = await this.comparePasswords({
      password,
      hash: foundUser.password,
    });

    if (!compareSuccess) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.generateSignToken({
      userId: foundUser.id.toString(),
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }

    // res.cookie('token', token, { httpOnly: true });

    return res.send({ message: 'Signin succefully', token });
  }

  // ================
  //    Sign Out    //
  //=================
  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Signout succefully' });
  }

  // ================
  //  Reset Pass  //
  //=================
  async resetPass(dto: ResetDto, req: Request, res: Response) {
    const { password, email, id } = dto;
    // generate hash password
    try {
      const userExists = await this.prisma.user.findUnique({
        where: { email, id: +id },
      });
      if (userExists) {
        const updatePassword = await this.hashPassword(password);
        await this.prisma.user.update({
          where: {
            email: email,
          },
          data: {
            password: updatePassword,
          },
        });
        return res.send({ message: 'Update password successfully' });
      }
      return res.send({ message: 'User Not Found' });
    } catch (error) {
      return { error };
    }
  }

  // ================
  //  Reset Token  //
  //=================
  async resetToken(dto: ResetDto, req: Request, res: Response) {
    const { email } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const resetToken = await this.generateResetToken({
      userId: foundUser.id.toString(),
      email: foundUser.email,
    });

    if (!resetToken) {
      throw new ForbiddenException('Could not signin');
    }

    const resetPasswordLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // const mailOptions = {
    //   from: 'hasanrafi68@gmail.com',
    //   to: email,
    //   subject: 'Reset Your Password',
    //   text: `Click on the following link to reset your password: ${resetPasswordLink}`,
    // };

    // try {
    //   await this.transporter.sendMail(mailOptions);
    //   return res.send({ message: 'Reset password email sent successfully.' });
    // } catch (error) {
    //   console.error('Error sending reset password email:', error);
    //   return res
    //     .status(500)
    //     .send({ error: 'Failed to send reset password email.' });
    // }

    return res.send({ message: resetPasswordLink });
  }

  // =================
  // Common function //
  //==================
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async generateSignToken(args: { userId: string; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '365d',
    });

    return token;
  }

  async generateResetToken(args: { userId: string; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '24h',
    });

    return token;
  }
}
