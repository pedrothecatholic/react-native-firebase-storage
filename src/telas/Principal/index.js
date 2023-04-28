import { View, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Cabecalho } from '../../componentes/Cabecalho';
import { CartaoInfo } from '../../componentes/CartaoInfo';
import { NovoPostBotao } from '../../componentes/NovoPostBotao';
import { pegarPostsTempoReal } from '../../servicos/firestore';
import estilos from './estilos';
import { Storage, storage } from '../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

export default function Principal({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const imagemRef = ref(storage, 'img3.png');
    getDownloadURL(imagemRef).then((url) => {
      console.log(url);
    });

    pegarPostsTempoReal(setPosts);
  }, []);

  return (
    <View style={estilos.container}>
      <Cabecalho />

      <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/spaceapp-65096.appspot.com/o/img3.png?alt=media&token=f784b320-06d5-4bf4-9b51-316eec4e3a2d'
        }}
        style={{ width: 200, height: 200 }}
      />

      <ScrollView style={estilos.scroll} showsVerticalScrollIndicator={false}>
        {posts?.map((item) => (
          <CartaoInfo
            key={item.id}
            imagem={item.imagem}
            titulo={item.titulo}
            fonte={item.fonte}
            descricao={item.descricao}
            acao={() => navigation.navigate('Post', { item })}
          />
        ))}
      </ScrollView>

      <NovoPostBotao acao={() => navigation.navigate('Post')} />
    </View>
  );
}
