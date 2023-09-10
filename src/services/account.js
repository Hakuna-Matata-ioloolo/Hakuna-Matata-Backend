const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const Account = require('../schema/account');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
  issuer: 'HakunaMatata',
  subject: 'Access Token',
};

exports.getList = async () => {
  return (await Account.find({})).map(account => {
    const { name, phoneNumber, school, grade, clazz, stdId } = account;
    return { name, phoneNumber, school, grade, clazz, stdId };
  });
};

exports.login = async ({ phoneNumber, password }) => {
  const account = await Account.findOne({ phoneNumber });

  if (!account) throw new Error(`전화번호 ${phoneNumber}로 가입된 계정이 존재하지 않습니다.`);

  const salt = account.salt;
  const hash = CryptoJS.SHA256(salt + password).toString(CryptoJS.enc.Base64);

  if (account.password !== hash) throw new Error('잘못된 비밀번호입니다.');

  return await jwt.sign({ token: account._id }, process.env.JWT_SECRET_KEY, jwtConfig, null);
};

exports.register = async ({ name, phoneNumber, school, grade, clazz, stdId, password }) => {
  if (await Account.findOne({ phoneNumber }))
    throw new Error(`전화번호 ${phoneNumber}로 가입된 게정이 이미 존재합니다.`);

  if (await Account.findOne({ school, grade, clazz, stdId }))
    throw new Error(
      `${school} ${grade}학년 ${clazz}반 ${stdId}번으로 가입된 계정이 이미 존재합니다.`,
    );

  if (!/^[가-힣]{2,4}$/.test(name)) throw new Error('잘못된 이름입니다.');
  if (!/^010[0-9]{8}$/.test(phoneNumber)) throw new Error('잘못된 전화번호입니다.');
  if (!/^(세명|제천제일|제천여자|제천)고등학교$/.test(school))
    throw new Error('잘못된 학교입니다.');
  if (!/^[1-3]$/.test(grade)) throw new Error('잘못된 학년입니다.');
  if (!/^[1-9]$/.test(clazz)) throw new Error('잘못된 반입니다.');
  if (!/(^[1-9]$|^[1-2][0-9]$|^30$)/.test(stdId)) throw new Error('잘못된 번호입니다.');
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$~!%*#?&])[A-Za-z\d@$~!%*#?&]{8,}$/.test(password))
    throw new Error('잘못된 비밀번호입니다.');

  const salt = Math.random().toString(36).substring(2).toUpperCase();
  const hash = CryptoJS.SHA256(salt + password).toString(CryptoJS.enc.Base64);

  const account = await new Account({
    name,
    phoneNumber,
    school,
    grade,
    clazz,
    stdId,
    password: hash,
    salt,
  }).save();

  return await jwt.sign({ token: account._id }, process.env.JWT_SECRET_KEY, jwtConfig, null);
};
