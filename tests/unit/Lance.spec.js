import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Um lance sem valor mínimo', () => {
  test('não aceita lance com valor menor que zero',()=>{
    const wrapper = mount(Lance);//monta o componente
    const input = wrapper.find('input');//localiza o input
    input.setValue(-100);//seta - 100 no input
    wrapper.trigger('submit');//disparamos o submit
    const lancesEmitidos = wrapper.emitted('novo-lance');//captura o evento novo-lance
    expect(lancesEmitidos).toBeUndefined();//validamos se o resultado do evento é undifined conforme previsto na aplicação
  });

  test('emite um lance quando o valor é maior do que zero', () =>{
    const wrapper = mount(Lance);//monta o componente
    const input = wrapper.find('input');//localiza o input
    input.setValue(100);//seta 100 no input
    wrapper.trigger('submit');
    const lancesEmitidos = wrapper.emitted('novo-lance');//captura o evento novo-lance
    expect(lancesEmitidos).toHaveLength(1);
  });

  test('emite valor esperado de um lance válido', () =>{
    const wrapper = mount(Lance);//monta o componente
    const input = wrapper.find('input');//localiza o input
    input.setValue(100);//seta 100 no input
    wrapper.trigger('submit');
    const lancesEmitidos = wrapper.emitted('novo-lance');//captura o evento novo-lance
    const lance = parseInt(lancesEmitidos[0][0]);
    expect(lance).toBe(100);
  });
})

describe('Um lance com valor mínimo', () => {
  test('todos os lances devem possuir valor maior que o mínimo informado', () =>{
    const wrapper = mount(Lance,{
      propsData:{
        lanceMinimo: 300
      }
    });//monta o componente
    const input = wrapper.find('input');//localiza o input
    input.setValue(400);//seta 400 no input
    wrapper.trigger('submit');
    const lancesEmitidos = wrapper.emitted('novo-lance');//captura o evento novo-lance
    expect(lancesEmitidos).toHaveLength(1);
  });

  test('emite um valor esperado e um lance válido', () =>{
    const wrapper = mount(Lance,{
      propsData:{
        lanceMinimo: 300
      }
    });//monta o componente
    const input = wrapper.find('input');//localiza o input
    input.setValue(400);//seta 400 no input
    wrapper.trigger('submit');
    const lancesEmitidos = wrapper.emitted('novo-lance');//captura o evento novo-lance
    const lance = parseInt(lancesEmitidos[0][0]);
    expect(lance).toBe(400);
  });

  test('não são aceitos lances com valores menor que o mínimo informado', async () =>{
    const wrapper = mount(Lance,{
      propsData:{
        lanceMinimo: 300
      }
    });//monta o componente
    const input = wrapper.find('input');//localiza o input
    input.setValue(200);//seta 200 no input
    wrapper.trigger('submit');
    await wrapper.vm.$nextTick();//Para aguardar a resposta do submit
    const msgErro = wrapper.find('p.alert').element.textContent;
    const msgEsperada = 'O valor mínimo para o lance é de R$ 300';
    expect(msgErro).toContain(msgEsperada);
  });
});

