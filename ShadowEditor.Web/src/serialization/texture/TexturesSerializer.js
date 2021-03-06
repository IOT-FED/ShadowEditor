import BaseSerializer from '../BaseSerializer';

import TextureSerializer from './TextureSerializer';
import CanvasTextureSerializer from './CanvasTextureSerializer';
import CompressedTextureSerializer from './CompressedTextureSerializer';
import CubeTextureSerializer from './CubeTextureSerializer';
import DataTextureSerializer from './DataTextureSerializer';
import DepthTextureSerializer from './DepthTextureSerializer';
import VideoTextureSerializer from './VideoTextureSerializer';

var Serializers = {
    'CanvasTexture': CanvasTextureSerializer,
    'CompressedTexture': CompressedTextureSerializer,
    'CubeTexture': CubeTextureSerializer,
    'DataTexture': DataTextureSerializer,
    'DepthTexture': DepthTextureSerializer,
    'VideoTexture': VideoTextureSerializer,
    'Texture': TextureSerializer
};

/**
 * TexturesSerializer
 * @author tengge / https://github.com/tengge1
 */
function TexturesSerializer() {
    BaseSerializer.call(this);
}

TexturesSerializer.prototype = Object.create(BaseSerializer.prototype);
TexturesSerializer.prototype.constructor = TexturesSerializer;

TexturesSerializer.prototype.toJSON = function (obj) {
    var serializer = Serializers[obj.constructor.name];

    if (serializer === undefined) {
        console.warn(`TexturesSerializer: 无法序列化${obj.type}。`);
        return null;
    }

    return (new serializer()).toJSON(obj);
};

TexturesSerializer.prototype.fromJSON = function (json, parent) {
    var generator = json.metadata.generator;

    var serializer = Serializers[generator.replace('Serializer', '')];

    if (serializer === undefined) {
        console.warn(`TexturesSerializer: 不存在 ${generator} 的反序列化器`);
        return null;
    }

    return (new serializer()).fromJSON(json, parent);
};

export default TexturesSerializer;