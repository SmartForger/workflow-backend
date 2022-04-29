import { Resolver, Mutation, Arg } from "type-graphql";
import { Storage } from "@google-cloud/storage";
import { SignedURL } from "../entities/SignedURL";
import { CreateSignedURLInput } from "../inputs/CreateSignedURLInput";

const BUCKET_NAME = "prodeo-eureka-files";
const storage = new Storage();

@Resolver()
export class CloudStorageResolver {
  @Mutation(() => SignedURL)
  async createSignedURL(
    @Arg("input") input: CreateSignedURLInput
  ): Promise<{ url: string; newFileName: string; expiresAt: number }> {
    const nameSplits = input.fileName.split(".");
    if (nameSplits.length < 2) {
      throw new Error("Invalid file name");
    }
    const fname = nameSplits.slice(0, -1).join(".");
    const ext = nameSplits[nameSplits.length - 1];

    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
    let newFileName = input.fileName;

    const [files] = await storage.bucket(BUCKET_NAME).getFiles({
      prefix: fname,
    });

    if (files?.length > 0) {
      const fileNames = files
        .map((f) => f.name)
        .filter((name) => name.endsWith("." + ext));
      let index = fileNames.length;
      while (fileNames.indexOf(newFileName) >= 0) {
        newFileName = `${fname}(${index}).${ext}`;
        index++;
      }
    }

    const [url] = await storage
      .bucket(BUCKET_NAME)
      .file(newFileName)
      .createResumableUpload({
        origin: input.origin,
        metadata: {
          contentType: input.contentType,
        },
      });

    return {
      url,
      newFileName,
      expiresAt: expires,
    };
  }
}
