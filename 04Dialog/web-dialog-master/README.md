## �ƶ���Web���-dialog

Ԥ�� [���](http://115.28.219.57/imooc/dialog/)

���÷���

```javascript
$("button").tap(function(){
	var d = $.dialog({
		  //����ѡ��
		  //�Ի�����
		  width:"auto",
		  height:"auto",
		  //�Ի�������
		  type:"ok",
		  buttons:null,
		  //�������ùر�
		  delay:null,
		  //�Ի�����ʾ��Ϣ
		  message:null,
		  //�Ի�������͸����
		  maskOpacity:null,
		  effect:null,
		  //��ʱ�رյĻص�����
		  delayCallback:null,
		  //������ֲ��Ƿ���Թر�
		  maskClose:null
	})
});
```
��װ˼·

Zepto��һ���jQuery���Ƶ��ƶ���JS���(Ӧ�ó�֮Ϊ������Ӧ�ø���׼ȷ��)�������﷨��JQ�߶�һ�£��������������Ѷ�Ҳ�������ý���������д�Ļ���
��������һ�²��(����˵���)�ı�д˼·��

1. ���ȴ�����ʼ����ʹ��`CSS`��`HTML`��д�þ�̬Ч����ȷ��Ч�������HTML�ṹ��ע�͵�����ʼ��дJS�߼���
1. ��Ϊһ���ǻ���jQuery�������������д���(������ε�Zepto)����������һ����Ľṹ��

```javascript
;(function($){
	var Dialog = function(config){
		this.config = {
			//����Ĭ�ϵĲ���
		}
		//�ϲ�config��this.config��
		if(config && $.isPlainObject(config)){
			$.extend(this.config,config);
		}else {
			//û�д��ݲ���
			this.isConfig = true;
		}
		//����������DOM���������д�������������Ŀ�����������������Ļ������ȳ�ʼ��ÿ��Dialog���еĽṹ
		this.body = $("body");
		//�������ֲ�
		this.mask = $('<div class="g-dialog-container"></div>');
		//����������
		this.win = $('<div class="dialog-window"></div>');
		//����������ͷ��
		this.winHeader = $('<div class="dialog-header"></div>');
		this.icon = $('<i class="iconfont"></i>')
		this.winBody = $('<div class="dialog-body"></div>');
		this.winFooter = $('<div class="dialog-footer"></div>');
		//ʹ��ԭ���ϵ�create������������DOM������ӵ�body
		this.create();
		
		
		Dialog.prototype = {
			//ԭ�͵Ĺ��з��������Ը�����Ҫ��Ӹ��෽��
			//��������
			animate:function(){},
			//����config������DOM�ṹ
			create:function(){},
			//close����
			close:function(){},
			//���ڴ���button�ķ����Ƚ���Ը��ӣ����ﵥ��д��createButton����
			createButton:function(){},
		}
	}
	//���ص�Zepto������
	$.dialog = function(config){
		return new Dialog(config);
	};
})(Zepto);
```

����˼·����������ϸ�ڲ��ֿ��Բ鿴Դ���롣