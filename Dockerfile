FROM amazon/aws-lambda-nodejs:18 AS BUILDER

WORKDIR /usr/app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .

RUN npm run build


FROM amazon/aws-lambda-nodejs:18 AS RUNNER

WORKDIR ${LAMBDA_TASK_ROOT}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=BUILDER ./usr/app/package.json ./ 
COPY --from=BUILDER ./usr/app/package-lock.json ./ 

RUN npm install --omit=dev

COPY --from=BUILDER ./usr/app/dist/* ./

CMD ["index.handler"]