import awsConfig from '@shared-backgammon/src/aws-exports';
import AWS from 'aws-sdk';
import crypto from 'crypto';
const { aws_cognito_region } = awsConfig;

export default class Cognito {
    static exists: boolean;
    static instance: Cognito;
    static validateAuthResponse(
        authResult?: AWS.CognitoIdentityServiceProvider.AuthenticationResultType
    ): authResult is AWS.CognitoIdentityServiceProvider.AuthenticationResultType {
        return Boolean(
            authResult?.AccessToken &&
                authResult?.ExpiresIn &&
                authResult?.IdToken &&
                authResult?.RefreshToken &&
                authResult?.TokenType
        );
    }

    private config = { region: aws_cognito_region };
    private clientId = process.env.AWS_CLIENT_ID as string;
    private clientSecret = process.env.AWS_CLIENT_SECRET as string;
    private username = process.env.AWS_CLIENT_USERNAME as string;
    private password = process.env.AWS_CLIENT_PASSWORD as string;

    public cognitoIdentity!: AWS.CognitoIdentityServiceProvider;
    public accessToken!: string;
    public expiresIn!: number;
    public idToken!: string;
    public refreshToken!: string;
    public tokenType!: string;

    constructor() {
        if (Cognito.exists) return Cognito.instance;

        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(
            this.config
        );

        Cognito.instance = this;
        Cognito.exists = true;
    }

    async signIn() {
        try {
            const signInParams = {
                ClientId: this.clientId,
                AuthFlow: 'USER_PASSWORD_AUTH',
                AuthParameters: {
                    USERNAME: this.username,
                    PASSWORD: this.password,
                    SECRET_HASH: this.generateHash(this.username),
                },
            };
            const r = await this.cognitoIdentity
                .initiateAuth(signInParams)
                .promise();

            const authResult = r.AuthenticationResult;
            if (Cognito.validateAuthResponse(authResult)) {
                this.accessToken = authResult.AccessToken as string;
                this.expiresIn = authResult.ExpiresIn as number;
                this.idToken = authResult.IdToken as string;
                this.refreshToken = authResult.RefreshToken as string;
                this.tokenType = authResult.TokenType as string;
            } else throw new Error('Invalid auth response.');
            console.log(r);
            // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // // @ts-ignore
            // const re = await this.cognitoIdentity
            //     .respondToAuthChallenge({
            //         ChallengeName: r.ChallengeName,
            //         Session: r.Session,
            //         ClientId: signInParams.ClientId,
            //         ChallengeResponses: {
            //             USERNAME: this.username,
            //             PASSWORD: this.password,
            //             SECRET_HASH: this.generateHash(this.username),
            //         },
            //     })
            //     .promise();
        } catch (error) {
            console.error(error);
        }
    }

    private generateHash(username: string): string {
        return crypto
            .createHmac('SHA256', this.clientSecret)
            .update(username + this.clientId)
            .digest('base64');
    }
}
