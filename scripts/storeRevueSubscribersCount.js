import * as dotenv from 'dotenv';
import path from 'path';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';

import { getRevueSubscribersCount } from './getRevueSubscribersCount.js';

dotenv.config();

const PROJECT_ROOT_PATH = process.cwd();

const DATA_FOLDER_PATH = path.join(PROJECT_ROOT_PATH, '/data');
const DATA_FILE_NAME = 'revueSubscribersCount.json';
const DATA_FILE_PATH = path.join(DATA_FOLDER_PATH, DATA_FILE_NAME);

const createDataFile = async (count) => {
    const content = `{\n\t"count": ${count}\n}`;

    try {
        if (!existsSync(DATA_FOLDER_PATH)) {
            await mkdir(DATA_FOLDER_PATH);
        }

        await writeFile(DATA_FILE_PATH, content, 'utf-8');
        console.log('✅ File with data about count of subscribers was successfully created');
    } catch(e) {
        console.error(`🔴 ${e}`);
    }
}

const storeRevueSubscribersCount = async () => {
    const count = await getRevueSubscribersCount()
    if (!count) {
        return;
    }
    await createDataFile(count);
};

storeRevueSubscribersCount();
