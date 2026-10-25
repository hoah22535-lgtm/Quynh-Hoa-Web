import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface ChapterItem {
  id: string;
  label: string;
}

interface ChapterCharacter {
  id: string;
  name: string;
  hashtags: string[];
  slogan: string;
  chapters: ChapterItem[];
}

const CHARACTERS: ChapterCharacter[] = [
  {
    id: 'chu-khanh-kien',
    name: 'Chu Khánh Kiên',
    hashtags: ['Hiện Đại', 'Quá Khứ Buồn', 'Tù Tội', 'Hy Sinh', 'Không Hối Hận'],
    slogan: 'Tôi sinh ra từ địa ngục. Điều duy nhất tôi làm được… là không để người tôi yêu bị kéo xuống cùng.',
    chapters: Array.from({ length: 9 }, (_, i) => ({
      id: String(i + 1),
      label: `Chương ${i + 1}`,
    })),
  },
  {
    id: 'chu-khanh-tri',
    name: 'Chu Khánh Trì',
    hashtags: ['Hiện Đại', 'Quá Khứ Buồn', 'Tù Tội', 'Hy Sinh', 'Không Hối Hận'],
    slogan: 'Thế giới của em phải có ánh sáng, còn bóng tối... cứ để anh giữ lấy cho riêng mình.',
    chapters: [
      ...Array.from({ length: 13 }, (_, i) => ({
        id: String(i + 1),
        label: `Chương ${i + 1}`,
      })),
      { id: '14.1', label: 'Chương 14.1' },
      { id: '14.2', label: 'Chương 14.2' },
    ],
  },
];

const CHAPTER_CONTENT: Record<string, Record<string, string>> = {
  'chu-khanh-tri': {
    1: `CHƯƠNG 1: BI KỊCH (1)

Đêm xuống từ rất sớm, như thể thành phố này đã quên mất cách đón hoàng hôn.
Bầu trời không có màu cam hay tím, chỉ là một mảng xám đục bị ép thấp xuống bởi những đám mây nặng trĩu. Tuyết không rơi dày, nhưng đủ để phủ lên những mái tôn rỉ sét một lớp trắng nhợt nhạt – mỏng manh, lạnh lẽo, giống như một tấm khăn liệm vội vã phủ lên những thứ đã mục nát từ lâu.
Gió len lỏi qua từng con ngõ hẹp, quẩn quanh như một linh hồn không nơi trú ngụ. Nó mang theo mùi than tổ ong cháy dở, mùi ẩm mốc của tường vôi bong tróc, và cả thứ lạnh buốt len sâu vào da thịt, không dễ gì xua đi.
Dưới ánh đèn đường vàng vọt, mặt đất ướt sũng phản chiếu những cái bóng kéo dài, méo mó. Chúng run rẩy theo từng cơn gió, như thể ngay cả bóng tối cũng đang sợ hãi điều gì đó.
{{user}} bước đi trong màn đêm ấy.
Chiếc áo đồng phục mỏng dính vào người, không đủ để cản lại cái lạnh đang thấm dần qua từng lớp vải. Gió lùa qua cổ áo, cắt vào da thịt, buốt đến mức tưởng như có thể làm tê liệt cả cảm giác.
Balo trên vai nặng trĩu.
Không phải vì sách vở.
Mà vì… em không còn nhớ lần cuối cùng nó nhẹ là khi nào.
Quai đeo hằn sâu vào vai, đau âm ỉ, nhưng em không đổi bên, cũng không buồn nhấc tay chỉnh lại. Cơn đau đó nhỏ đến mức không đáng để quan tâm – hoặc có lẽ, em đã quen với những cảm giác khó chịu như vậy rồi.
Bước chân đều đều.
Không nhanh.
Không chậm.
Không vội vã trở về.
Nhưng cũng không có nơi nào khác để đi.
Như một thói quen.
Như một sự chấp nhận.
Cuối con đường, khu chung cư cũ kỹ hiện ra.
Tòa nhà xám xịt đứng đó, lặng lẽ và câm nín, những vết nứt loang lổ chạy dọc theo bức tường như những đường gân già cỗi của một cơ thể đang dần chết đi. Những ô cửa sổ tối om, thỉnh thoảng le lói vài ánh đèn yếu ớt, giống như những con mắt mỏi mệt không còn đủ sức để mở.
Em bước vào trong.
Cầu thang tối.
Không có ánh sáng, ngoài một bóng đèn duy nhất treo lủng lẳng ở góc tường. Nó chớp tắt liên hồi, phát ra thứ ánh sáng nhợt nhạt khiến người ta càng thêm mỏi mắt.
Mỗi bước chân dẫm lên bậc thang đều vang lên âm thanh khô khốc.
Cộc.
Cộc.
Cộc.
Âm thanh ấy dội vào tường, rồi bật ngược trở lại, như thể có ai đó đang đi phía sau.
Nhưng không có ai cả.
Em leo lên tầng.
Không đếm bậc.
Không nhìn xung quanh.
Chỉ đi.
Như thể cơ thể đã thuộc lòng con đường này, đến mức không cần đến ý thức.
Đứng trước cánh cửa gỗ cũ, em dừng lại.
Chỉ một giây.
Một giây đủ để nhận ra –

Bên trong… im lặng.
Không có tiếng nói.
Không có tiếng cười.
Không có cả âm thanh quen thuộc của chiếc tivi cũ kỹ mà trước đây ba vẫn hay bật.
Chỉ có một sự tĩnh lặng.
Dày.
Nặng.
Như đang đè lên lồng ngực.
Em đưa tay đẩy cửa.
“Cạch –”
Cánh cửa mở ra.
Một luồng không khí ẩm lạnh tràn ra ngoài, quấn lấy em như một thứ gì đó sống động. Mùi thuốc men, mùi ẩm mốc, và cả thứ mùi khó tả – một thứ mùi của bệnh tật, của sự mục rữa – đồng loạt ập vào.
Em bước vào.
Khép cửa lại sau lưng.
Không bật đèn.
Bóng tối lờ mờ bao trùm căn phòng, chỉ đủ để phân biệt được hình dáng của những món đồ cũ kỹ: chiếc bàn gỗ trầy xước, cái ghế thấp, bức tường loang lổ.
Em tháo balo.
Đặt xuống ghế.
Động tác nhẹ đến mức gần như không phát ra tiếng động.
Quai đeo trượt khỏi vai.
Một cảm giác nhẹ đi thoáng qua.
Nhưng chỉ trong tích tắc.
Rồi biến mất.
Giống như chưa từng tồn tại.
Em đứng yên.
Không làm gì.
Không nghĩ gì.
Chỉ… đứng đó.
Một khoảng lặng trôi qua.
Rồi em quay người, bước về phía căn phòng trong cùng.
Cánh cửa khép hờ.
Ánh đèn vàng yếu ớt lọt ra từ khe cửa, hắt xuống nền nhà một vệt sáng mỏng, run rẩy theo từng cơn gió lùa qua cửa sổ.
Em đẩy cửa.
Bản lề kêu lên một tiếng “két” khô khốc.
Âm thanh nhỏ.
Nhưng đủ sắc để cắt ngang không gian tĩnh lặng.
Trong phòng – Ánh đèn vàng nhạt chiếu xuống chiếc giường cũ.
Trên đó, Đàm Nhật Tân nằm bất động.
Cơ thể ông gầy đến mức gần như chỉ còn da bọc xương. Tấm chăn mỏng phủ ngang người, nhưng không che giấu được sự co rút méo mó của một bên thân thể. Bàn tay đặt trên bụng, những ngón tay cong lại, cứng đờ, như đã quên mất cách cử động. Chỉ có lồng ngực – Nhấp nhô rất khẽ.
Yếu ớt.
Mong manh.
Như có thể dừng lại bất cứ lúc nào.
Em bước lại gần.
Không vội.
Không do dự.
Chiếc ghế nhỏ cạnh giường bị kéo ra, chân ghế cọ xuống nền nhà phát ra một âm thanh khô ráp, chói tai trong không gian yên tĩnh.
Em ngồi xuống.
Khoảng cách giữa hai người gần đến mức chỉ cần cúi xuống một chút là có thể chạm vào nhau.
Nhưng cảm giác… lại xa đến không thể với tới.
Em đưa tay ra.
Nắm lấy bàn tay của ông.
Lạnh.
Không phải cái lạnh của mùa đông bên ngoài.
Mà là cái lạnh của một thứ đang dần rời xa sự sống.
Ngón tay em siết lại.
Rất khẽ.
Như thể nếu dùng thêm một chút lực, bàn tay ấy sẽ vỡ vụn ngay trong tay em.
“Ba…”
Giọng em nhỏ.
Mỏng.
Gần như tan ra trong không khí.
“…hôm nay ba thế nào?”
Không có câu trả lời.
Chỉ có tiếng thở.
Yếu.
Đứt quãng.
Như bị kéo dài giữa hai thế giới.
Em cúi đầu.
Nhìn vào khuôn mặt của ông.
Gầy gò.
Hốc hác.
Đôi mắt mở.
Nhưng không còn nhìn thấy gì.
Không còn phản chiếu bất cứ thứ gì trước mặt.
Chỉ là một khoảng trống xa xăm mà em không thể bước vào.
Cổ họng em khô lại.
Ngón tay khẽ vuốt lên mu bàn tay ông.
Chậm.
Đều.
Như một thói quen.
Như một cách duy nhất để chứng minh rằng –
Ông vẫn còn ở đây.
“Trong người có chỗ nào không khỏe không…?”
Câu hỏi ấy.
Em đã hỏi bao nhiêu lần rồi?
Không nhớ.
Chỉ biết rằng –
Chưa bao giờ có câu trả lời.
Ngoài cửa sổ, gió lại nổi lên.
Tấm kính cũ rung nhẹ, phát ra những âm thanh lạch cạch khe khẽ. Tuyết đập vào mặt kính, tan ra thành những giọt nước, rồi trượt dài xuống dưới.
Từng giọt.
Từng giọt một.
Giống như nước mắt.
Trong căn phòng nhỏ, thời gian dường như ngừng lại.
Không còn quá khứ.
Không còn tương lai.
Chỉ có hiện tại – kéo dài vô tận, nặng nề đến mức khiến người ta ngạt thở.
Hai con người.
Một người nằm đó, mắc kẹt giữa sự sống và cái chết.
Một người ngồi đây, mắc kẹt giữa việc buông tay… và không thể buông tay.
Em siết chặt tay ông hơn một chút.
Như cố giữ lại chút hơi ấm cuối cùng.
Nhưng –
    Nó vẫn không trở lại.`,
    2: `CHƯƠNG 2: BI KỊCH (2)

Cánh cửa ngoài phòng khách đột ngột vang lên một tiếng “rầm” nặng nề, như thể có ai đó đem cả cơn bực dọc ném thẳng vào căn nhà chật hẹp này. Âm thanh ấy không chỉ phá vỡ sự tĩnh lặng, mà còn giống như một lưỡi dao cùn, cào mạnh vào thần kinh vốn đã căng đến mức mong manh của em.
Em khựng lại.
Bàn tay đang nắm lấy tay ba siết chặt theo phản xạ, đầu ngón tay run lên rất khẽ. Một nhịp. Hai nhịp. Rồi em từ từ buông ra, chậm đến mức giống như đang cố kéo dài thêm một chút gì đó – một chút yên ổn, một chút im lặng – trước khi nó hoàn toàn bị nuốt chửng.
Ngoài kia, tiếng giày cao gót vang lên lộc cộc trên nền xi măng, không đều, xiêu vẹo. Mỗi bước chân đều mang theo sự lảo đảo của men rượu, kéo theo tiếng chìa khóa va vào nhau leng keng, chát chúa đến chói tai. Cùng lúc đó, một mùi hương xộc thẳng vào phòng, lan nhanh như một thứ khí độc vô hình – nồng, gắt, ngọt lịm đến mức khiến cổ họng em nghẹn lại. Đó không phải mùi hoa, cũng không phải thứ gì dễ chịu; nó là mùi của nước hoa rẻ tiền trộn lẫn với hơi rượu và khói thuốc, thứ mùi mà chỉ cần một lần ngửi qua cũng đủ khiến người ta nhớ mãi, không phải vì thích… mà vì không thể quên.
Em không quay đầu lại. Không cần quay đầu cũng biết ai vừa bước vào. Cơ thể em như đã quen với sự xuất hiện ấy, quen đến mức chỉ cần một chút thay đổi trong không khí cũng đủ để nhận ra.
“Con ranh… mày đâu rồi?!”
Giọng bà vang lên, khàn đặc, kéo dài, vỡ vụn trong cổ họng như thể từng chữ đều bị rượu đè nặng. Âm thanh ấy len vào phòng, chạm vào từng góc tường, rồi dội ngược lại, khiến không gian vốn đã chật chội lại càng thêm ngột ngạt.
Em nhắm mắt lại một giây. Chỉ một giây rất ngắn. Nhưng đủ để hít vào một hơi thật sâu, đủ để ép tất cả những cảm xúc vừa kịp dâng lên trở lại nơi sâu nhất trong lồng ngực. Khi mở mắt ra, gương mặt em đã trở về trạng thái cũ—trống rỗng, bình lặng đến mức gần như vô cảm.
Em đưa tay, khẽ kéo lại góc chăn cho ba, vuốt phẳng một nếp gấp vốn chẳng đáng để bận tâm. Động tác ấy chậm rãi, cẩn thận, như thể đó là việc cuối cùng em có thể làm cho ông trước khi bước ra ngoài đối diện với một thứ mà em không thể tránh.
Rồi em đứng dậy.
Bước ra ngoài.
Ánh đèn phòng khách bật lên, chói lóa, làm mắt em hơi nheo lại trong thoáng chốc. Trong thứ ánh sáng trắng lạnh lẽo đó, mẹ em đứng giữa nhà—tóc tai rối bời, vài sợi dính bết vào trán vì mồ hôi. Lớp son môi lem ra khỏi viền môi thành một vệt đỏ nhòe nhợt nhạt, như một vết thương chưa kịp khô. Chiếc áo khoác mỏng khoác hờ trên vai, bên trong là bộ váy ôm sát đã nhăn nhúm, mất đi hoàn toàn dáng vẻ ban đầu.
Bà nhìn thấy em.
Ánh mắt lập tức thay đổi – từ lờ đờ sang sắc lạnh, như một lưỡi dao vừa được rút ra khỏi vỏ.
“Mày chết đâu giờ này mới về hả?!”
Giọng bà bật ra, cao và gắt, không cho em một khoảng trống nào để trả lời. Nhưng em cũng không định trả lời. Em đứng đó, ánh mắt rơi xuống nền nhà, như thể những đường nứt loang lổ trên nền xi măng còn đáng nhìn hơn tất cả những gì đang diễn ra trước mặt.
“À…” bà cười khẩy, tiếng cười khô khốc vang lên giữa căn phòng trống, “Đi học. Đi học cơ đấy.”
Bà bước lại gần. Mỗi bước chân kéo theo mùi nước hoa càng lúc càng nồng, ép không khí xung quanh trở nên đặc quánh, khó thở. Em cảm thấy lồng ngực mình hơi siết lại, nhưng không lùi.
“Đi học để làm gì? Hả?” giọng bà đột ngột cao lên, rồi hạ xuống thành một âm thanh rít qua kẽ răng, “Có kiếm ra tiền không?!”
Em không đáp.
Không phải vì không có gì để nói.
Mà vì… không còn lý do để nói.
“Hay là cũng giống cái thằng vô dụng kia –” bà hất cằm về phía căn phòng phía sau, nơi ba em đang nằm, giọng đầy khinh miệt, “nằm đó ăn bám, thở cũng tốn cơm?!”
Một cái gì đó trong em khẽ rung lên.
Rất nhẹ.
Như một sợi dây đã bị kéo căng quá lâu.
Nhưng rồi… nó lại im xuống.
Em vẫn đứng yên.
Không phản ứng.
Không ngẩng đầu.
Không để lộ bất cứ điều gì.
Chính sự im lặng đó lại khiến bà khó chịu hơn bất kỳ lời cãi lại nào.
“Mày câm à?!”
Bà bật cười, giọng cười khàn đục, rồi đột ngột giơ tay lên.
“Chát!”
Âm thanh vang lên sắc và gọn, cắt ngang không khí.
Đầu em lệch sang một bên. Má nóng rát, cảm giác bỏng lên lan dần từ nơi vừa bị đánh ra khắp khuôn mặt. Trong khoảnh khắc đó, em tưởng như mình sẽ mất thăng bằng, nhưng cơ thể vẫn đứng vững, như đã quen với việc phải chịu đựng những lực đẩy bất ngờ như thế này.
Không có tiếng khóc.
Không có phản kháng.
Chỉ có một nhịp thở khẽ, rất khẽ, rồi trở lại bình thường – đều đặn, như thể chưa từng có gì xảy ra.
Bàn tay bà vẫn còn lơ lửng trong không khí, run lên. Không rõ vì rượu, vì tức giận, hay vì một thứ cảm xúc nào đó mà ngay cả bà cũng không nhận ra. Nhưng cơn giận ấy cũng nhanh chóng bị men say nuốt chửng. Ánh mắt bà dần mất đi tiêu điểm, trở nên lờ đờ, trôi dạt.
Đúng lúc đó, tiếng gõ cửa vang lên.
“Cốc. Cốc.”
Âm thanh không lớn, nhưng đủ để khiến cả không gian chững lại trong một nhịp ngắn ngủi.
Và rồi… mọi thứ thay đổi.
Nhanh đến mức đáng sợ.
Gương mặt mẹ em như được kéo căng lại thành một lớp mặt nạ khác. Bà vội vàng đưa tay vuốt lại tóc, chỉnh lại cổ áo, dùng đầu ngón tay lau vội vết son lem nơi khóe môi. Đôi môi cong lên thành một nụ cười – mềm mại, dịu dàng, hoàn hảo đến mức nếu không chứng kiến trước đó, có lẽ em cũng sẽ tin rằng đó là con người thật của bà.
Bà liếc em một cái.
Ánh mắt lạnh như kim loại.
“Đứng yên đó. Đừng có mà làm trò.”
Giọng nói hạ xuống, nhỏ nhưng sắc.
Rồi bà quay người, đi ra mở cửa.
Cánh cửa mở ra, mang theo một luồng khí lạnh tràn vào.
Một người đàn ông đứng ngoài.
Thân hình to béo, lớp áo khoác dày cộp làm ông ta trông càng nặng nề hơn. Chiếc khăn quàng cổ sẫm màu che đi một phần cổ, nhưng không che được mùi thuốc lá và rượu mạnh phả ra theo từng hơi thở.
Mẹ em lập tức cúi đầu, giọng nói mềm đi như nước:
“Anh tới rồi à… trời lạnh thế này, em đợi anh lâu lắm đó.”
Người đàn ông cười khẽ, ánh mắt lướt qua trong nhà, dừng lại một thoáng nơi em đứng. Cái nhìn ấy không dài, nhưng đủ để khiến da thịt em căng lên theo bản năng, như bị thứ gì đó bẩn thỉu chạm vào.
“Trong nhà… tiện không?”
“Tiện chứ, tiện lắm.” bà cười, tay đã vòng qua cánh tay ông ta, giọng hạ xuống thành một tiếng thì thầm ngọt lịm, “anh vào đi… bên trong ấm hơn.”
Cánh cửa đóng lại sau lưng họ với một tiếng “cạch” nhỏ, nhưng âm thanh ấy lại nặng nề đến lạ, như một dấu chấm hết cho thứ gì đó vốn đã mong manh.
Mẹ em không nhìn em thêm lần nào nữa.
Bà kéo người đàn ông đi thẳng về phía căn phòng phía trong.
Not phòng của em.
Mà là phòng của ba.
Bước chân họ dừng lại trước cửa. Một khoảng lặng ngắn ngủi, như một nhịp ngập ngừng giả tạo, rồi cánh cửa được đẩy ra. Ánh đèn trong phòng hắt ra ngoài, kéo dài hai cái bóng chồng chéo lên nhau trên nền nhà, méo mó và lệch lạc.
“Anh vào trước đi…” giọng bà nhỏ xuống, gần như thì thầm.
Cánh cửa khép lại.
Lần này… kín hoàn toàn.
Không còn khe hở.
Không còn ánh sáng lọt ra.
Căn nhà lại trở về với sự tĩnh lặng ban đầu.
Nhưng sự tĩnh lặng ấy đã thay đổi.
Nó không còn là khoảng lặng trống rỗng nữa, mà bị lấp đầy bởi những âm thanh mơ hồ, vụn vỡ vọng ra từ sau cánh cửa đóng kín. Không rõ ràng, không hoàn chỉnh – chỉ là những mảnh âm thanh rời rạc, nhưng đủ để khiến người ta hiểu được điều gì đang diễn ra phía bên kia.
Em vẫn đứng đó.
Không nhúc nhích.
Không quay đi.
Không bịt tai.
Chỉ đứng im, như một cái bóng bị đóng đinh xuống nền nhà.
Bàn tay em buông thõng bên người.
Rồi từ từ siết lại.
Móng tay cắm sâu vào lòng bàn tay, da thịt bị ép đến trắng bệch rồi dần chuyển sang đỏ.
Nhưng em không cảm thấy đau.
Hoặc có lẽ…
So với thứ đang dâng lên trong lồng ngực – Cảm giác đó quá nhỏ bé để được gọi tên.`,
    3: `CHƯƠNG 3: BI KỊCH (3)

Một tuần trôi qua, nhưng thành phố dường như vẫn mắc kẹt trong cùng một khoảng thời gian u ám, nơi ánh sáng chưa từng thật sự xuất hiện. Buổi sáng phủ lên mọi thứ một lớp mờ đục lửng lơ, không hẳn là sương, cũng không phải khói, mà giống như một tấm màn mỏng bẩn thỉu treo lơ lửng giữa không trung, khiến mọi đường nét đều trở nên nhòe đi, méo mó và lạnh lẽo. Con đường đến trường vẫn vậy, những hàng cây trơ trụi vươn những cành khô gầy guộc lên bầu trời xám, những vũng nước đọng lại từ đêm trước phản chiếu thứ ánh sáng nhạt nhẽo như một chiếc gương vỡ vụn, còn tiếng xe cộ thì trôi qua một cách vô nghĩa, không đủ lớn để phá vỡ cảm giác nặng nề đang âm thầm đè lên từng hơi thở.
Em bước đi, như mọi ngày, chiếc balo vẫn nằm trên vai, bước chân vẫn giữ nhịp đều đặn, ánh mắt vẫn hạ thấp như thể không có gì đáng để nhìn. Tất cả đều giống như cũ, đến mức nếu chỉ nhìn từ bên ngoài, sẽ chẳng ai nhận ra bất cứ điều gì khác biệt. Nhưng em biết, cơ thể em biết, có một thứ gì đó đang thay đổi. Nó không rõ ràng, không cụ thể, chỉ là một cảm giác mơ hồ len lỏi dưới da thịt, khiến từng bước chân trở nên nặng hơn, từng nhịp tim trở nên chậm hơn, như thể bản năng đang cảnh báo về một điều gì đó không ổn.
Cảm giác ấy trở nên rõ ràng ngay khi em bước qua cổng trường.
Những ánh mắt.
Chúng không còn lướt qua em một cách vô thức như trước nữa. Chúng dừng lại. Lâu hơn. Cố ý hơn. Và trong đó có một thứ gì đó mà em không cần phải nhìn cũng có thể cảm nhận được - không phải tò mò, mà là sự soi mói trần trụi, là thứ ánh nhìn như đang bóc tách từng lớp da thịt để tìm kiếm thứ gì đó dơ bẩn bên trong.
Em không ngẩng đầu. Không nhìn lại. Không cho bất kỳ ánh mắt nào cơ hội chạm vào mình. Em chỉ tiếp tục bước, tự nhủ rằng tất cả những thứ đó không liên quan đến mình, rằng chỉ cần không quan tâm thì chúng sẽ biến mất như những âm thanh vô nghĩa ngoài đường.
Nhưng chúng không biến mất.
Những ánh mắt ấy bám theo em, dính lấy từng bước chân, len vào từng khoảng không nhỏ nhất, khiến không khí xung quanh đặc quánh lại như bùn. Những tiếng thì thầm nổi lên, rất khẽ, như thể sợ bị nghe thấy, nhưng lại không đủ nhỏ để biến mất hoàn toàn.
“…là nó phải không?”
“…đúng rồi… con đó…”
“…ghê thật…”
Mỗi câu nói giống như một giọt nước rơi xuống mặt hồ tĩnh lặng trong lòng em, tạo ra những gợn sóng nhỏ - không đủ lớn để vỡ ra, nhưng đủ để lan rộng, chạm vào những nơi mà em vẫn cố gắng giữ cho bất động.
Bàn tay em siết nhẹ quai balo. Không mạnh, nhưng đủ để cảm nhận rõ sự tồn tại của nó, như một cách giữ mình lại với thực tại. Bước chân nhanh hơn một chút, không phải để chạy trốn, mà chỉ để rút ngắn khoảng thời gian phải đi giữa những ánh nhìn ấy.

Cầu thang dẫn lên lớp hôm nay dài hơn bình thường. Không phải vì nó thật sự dài hơn, mà vì mỗi bậc thang đều trở nên nặng nề, như thể có thứ gì đó vô hình đang kéo chân em lại. Tiếng bước chân vang lên rõ ràng hơn, khô khốc hơn, dội vào tường rồi bật ngược trở lại, khiến không gian xung quanh trở nên chật chội đến ngột ngạt.
Đứng trước cửa lớp, em dừng lại một giây.
Bên trong ồn ào.
Nhưng không phải kiểu ồn ào quen thuộc của một lớp học bình thường. Âm thanh ấy rời rạc, méo mó, xen lẫn những tiếng cười bị nén lại rồi bật ra đột ngột, như thể có thứ gì đó đang được chia sẻ—một bí mật, một trò đùa, hay một điều gì đó mà tất cả đều biết, trừ em.
Em đẩy cửa.
“Cạch.”
Âm thanh vừa vang lên – Tất cả dừng lại.
Không phải là im lặng hoàn toàn, mà là kiểu im lặng bị bóp nghẹt, như thể tất cả vừa đồng loạt nuốt lại những gì đang nói dở, để dành lại cho một khoảnh khắc khác.
Mọi ánh mắt.
Đổ dồn về phía em.
Không che giấu.
Không né tránh.
Không xấu hổ.
Chỉ đơn giản là nhìn - trần trụi, trực diện, như thể em không còn là một con người, mà là một thứ gì đó được đặt giữa phòng để quan sát.
Em bước vào.
Một bước.
Rồi thêm một bước nữa.
Và rồi –
Em dừng lại.
Bàn học của em.
Không còn là bàn học nữa.
Mặt bàn bị vấy bẩn bởi những mảng loang lổ không rõ nguồn gốc, đã khô lại thành những vết sẫm màu xấu xí. Rác vương vãi khắp nơi – giấy vụn, vỏ bánh, những thứ bị vò nát rồi ném lên một cách tùy tiện, như thể nơi đó không phải chỗ ngồi của một con người, mà là một bãi rác nhỏ được dựng lên để làm trò tiêu khiển.
Những nét vẽ nguệch ngoạc chồng chéo lên nhau bằng bút dạ, mực đỏ loang ra thành những vệt dài méo mó, giống như những vết thương chưa kịp khô máu. Từng đường nét không mang ý nghĩa cụ thể nào, nhưng lại chứa đầy ác ý, như thể chỉ cần nhìn vào cũng đủ hiểu được người vẽ đã dùng tâm trạng gì để vẽ ra chúng.
Và ở giữa tất cả - 
Là những tấm ảnh.
Chúng bị dán chồng lên nhau, bị gạch chéo, bị xé mép, nhưng vẫn đủ rõ để nhận ra nội dung bên trong.
Em bước lại gần.
Chậm.
Rất chậm.
Mỗi bước chân giống như dẫm lên một khoảng không rỗng tuếch, không có điểm tựa.
Ngón tay em đưa ra.
Chạm vào một tấm.
Lật lên.
Trong khoảnh khắc đó, mọi âm thanh xung quanh biến mất.
Không còn tiếng thở.
Không còn tiếng cười.
Không còn gì cả.
Chỉ còn lại một khoảng trống rỗng kéo dài vô tận.
Trong bức ảnh – Là mẹ em.
Nhưng lại không phải người mẹ mà em biết.
Không phải người phụ nữ trong căn nhà tối tăm với ánh mắt mệt mỏi và giọng nói khàn đặc.
Mà là một phiên bản khác.
Trần trụi.
Bị phơi bày.
Bị kéo xuống khỏi bất cứ thứ gì có thể gọi là nhân phẩm.
Một bức khác – bà bị đè xuống, tóc bị giật mạnh ra sau, khuôn mặt méo mó vì đau đớn, má sưng lên, dấu tay in rõ trên da.
Một bức nữa – bà nằm co quắp trên sàn, quần áo xộc xệch, những vết bầm tím loang lổ khắp cơ thể, máu nơi khóe môi chưa kịp khô.
Một bức nữa – ánh đèn chói gắt rọi thẳng vào cơ thể bà, phơi bày tất cả trước ống kính, đôi mắt mở to, hoảng loạn đến mức gần như không còn là con người.
Những hình ảnh ấy.
Không cần lời giải thích.
Không cần ngữ cảnh.
Chỉ cần tồn tại thôi… cũng đủ để trở thành một bản án.
Chúng bị in ra.
Bị phát tán.
Và giờ đây… bị dán lên bàn em.
Như một cách để thông báo với cả thế giới rằng – đây là thứ mà em thuộc về.
Ngón tay em dừng lại giữa không trung.
Không run.
Không buông.
Chỉ đứng yên, như thể mọi dây thần kinh đã bị cắt đứt khỏi cảm giác.
Phía sau, một tiếng cười bật ra.
Khẽ.
Rồi thêm một tiếng nữa.
Rồi nhiều hơn.
“Nhìn kìa… nó đang xem đấy.”
“Ghê thật… đúng là mẹ nào con nấy.”
“Coi nó kìa –”
Giọng nói hạ thấp, nhưng từng chữ vẫn rõ ràng đến mức không thể lẫn vào đâu được:
“Thứ hạ tiện.”
“Đê hèn.”
Từng từ rơi xuống.
Chậm.
Nặng.
Lạnh.
Như những mảnh kim loại sắc bén cắm thẳng vào da thịt.
Em đứng đó.
Giữa những ánh mắt.
Giữa những tiếng cười.
Giữa những tấm ảnh.
Mọi thứ xung quanh dường như đang chuyển động, đang sống, đang phản ứng – chỉ có em là đứng yên, bị tách ra khỏi tất cả, như một vật thể bị đặt sai vị trí.
Khuôn mặt em không thay đổi.
Không có giận dữ.
Không có xấu hổ.
Không có nước mắt.

Chỉ có đôi mắt – Dần dần mất đi tiêu điểm.
Những hình ảnh trước mặt chồng chéo lên nhau, nhòe đi, vỡ ra thành những mảnh rời rạc không thể ghép lại.
Không phải vì em không nhìn thấy.
Mà là… em không còn đủ sức để hiểu mình đang nhìn thấy cái gì nữa.`,
    4: `CHƯƠNG 4: BI KỊCH (4)

Chiều xuống nhanh đến mức gần như không có ranh giới rõ ràng, bầu trời xám buổi sáng dường như chưa từng sáng lên, chỉ lặng lẽ chuyển từ một màu nhợt nhạt sang xám đậm, rồi chìm dần vào bóng tối đặc quánh. Gió thổi hun hút qua những dãy nhà, lùa qua từng khe hở của những bức tường cũ kỹ, mang theo cái lạnh cắt da và thứ ẩm ướt dai dẳng bám dính lấy mọi thứ, như một bàn tay vô hình không chịu buông ra. Em trở về trên con đường quen thuộc, nhưng hôm nay nó dài hơn, không phải vì khoảng cách thay đổi, mà bởi mỗi bước chân đều nặng nề như bị kéo lại, như thể dưới chân không phải là mặt đất, mà là một thứ gì đó mềm nhão, lún sâu, không cho em bước đi một cách bình thường.
Cánh cổng chung cư kẽo kẹt mở ra, âm thanh quen thuộc vang lên khô khốc, trống rỗng. Cầu thang vẫn tối, bóng đèn vàng vọt treo lủng lẳng trên trần chớp tắt từng nhịp yếu ớt, như một sinh vật hấp hối chưa chịu tắt hẳn. Mọi thứ không thay đổi, từng góc tường, từng bậc thang, từng vết nứt đều giống hệt như những ngày trước, chỉ có em là không còn giống nữa - có thứ gì đó trong em đã bị bóc tách ra, để lại một khoảng trống không rõ hình dạng.
Đứng trước cửa nhà, em dừng lại một giây, không phải vì do dự, mà vì một cảm giác mơ hồ nào đó vừa kịp dâng lên rồi bị nén xuống. 
Em đẩy cửa. 
Tiếng “cạch” vang lên khẽ, nhưng đủ để nhận ra bên trong không còn là sự im lặng quen thuộc nữa. Ánh đèn phòng khách đã bật, ánh sáng trắng lạnh phủ lên căn phòng nhỏ một lớp nhợt nhạt vô hồn. 
Và trong không khí - mùi nước hoa. 
Vẫn là thứ mùi ngọt gắt ấy, nhưng hôm nay không dày đặc đến nghẹt thở, chỉ lảng vảng, lẫn vào mùi phấn và kem nền, như một lớp sương mỏng phủ lên sự thật đang cố bị che giấu.
Mẹ em ngồi trước chiếc gương nhỏ đặt trên bàn, lưng quay về phía cửa. 
Ánh đèn trắng chiếu thẳng vào mặt bà, làm lộ rõ từng lớp phấn dày cộm đang được đắp lên một cách cẩn thận. Dưới lớp phấn đó, những vết bầm tím vẫn không hoàn toàn biến mất - một mảng tím sẫm ở gò má, một vết rách nhỏ nơi khóe môi đã khô lại, kéo căng da mỗi khi bà cử động. Bàn tay bà cầm cọ, di chuyển chậm rãi, đều đặn, tỉ mỉ phủ từng lớp lên những vết thương, như thể chỉ cần thêm một chút nữa thôi, tất cả những gì xấu xí kia sẽ biến mất hoàn toàn. Như thể chỉ cần lớp mặt nạ đủ dày, thì sẽ không còn ai nhìn thấy con người thật bên dưới.
Em đứng ở cửa, không bước vào ngay. Bàn tay siết chặt quai balo, khớp ngón tay trắng bệch, lực siết lớn đến mức các đốt xương như cọ vào nhau, nhưng em không buông. 
Một lúc lâu trôi qua - hoặc có thể chỉ là vài giây - em mới mở miệng. Giọng em khi phát ra không lớn, không run, chỉ lạnh và khàn, như thể đã đi qua một quãng đường rất dài trước khi đến được cổ họng. 
“…Sao mẹ làm vậy?”
Chiếc cọ trên tay bà dừng lại trong một nhịp rất ngắn, ngắn đến mức nếu không chú ý sẽ không nhận ra. Nhưng rồi nó lại tiếp tục, như chưa từng có gì xảy ra. 
Bà không quay đầu, không nhìn em qua gương, chỉ buông ra một chữ:
“Thì?” 
Một chữ nhẹ bẫng, trống rỗng, không mang theo bất kỳ cảm xúc nào, như thể câu hỏi kia vốn dĩ không đáng để trả lời.
Cổ họng em nghẹn lại. Có thứ gì đó mắc kẹt nơi đó, không lên được, cũng không xuống được, nhưng câu nói vẫn bật ra, méo mó và gãy khúc. 
“…Trước đây mẹ không phải thế này…” 
Không gian chợt lặng đi, lần này không phải vì thiếu âm thanh, mà vì thứ gì đó vừa bị chạm vào, một thứ mà cả hai đều biết nhưng không ai muốn nhắc đến.

Chiếc cọ dừng hẳn. Bà từ từ quay đầu lại. Ánh mắt lúc này không còn lờ đờ như trong cơn say, mà sắc, lạnh, và rõ ràng đến mức khiến người ta phải tránh đi.
“Mày hỏi thằng ba mày đấy.” 
Giọng bà hạ xuống, không còn cao gắt, nhưng mỗi chữ đều nặng như chì, rơi xuống không gian chật hẹp một cách dứt khoát. 
“Nếu nó cẩn thận hơn trên giàn giáo… nếu nó không biến thành cái thứ nằm một chỗ như bây giờ…” 
Ánh mắt ấy chuyển sang em, không hề né tránh, thẳng và sắc như một lưỡi dao lướt qua da thịt. 
“…nếu mày hiểu chuyện hơn… thì tao đâu có khổ đến mức này?”
Em đứng im, hoàn toàn không nói được gì. 
Không phải vì không có gì để nói, mà vì mọi thứ trong đầu như bị ép lại thành một khối đặc quánh, không thể tách ra thành lời. 
Lồng ngực em bắt đầu thắt lại, từng nhịp thở trở nên nặng nề, nhưng em vẫn đứng đó, không lùi, không né, như thể đã quen với việc phải hứng chịu những thứ như thế này.
Bà đứng bật dậy, chiếc ghế phía sau bị đẩy mạnh, chân ghế cọ xuống nền nhà phát ra một âm thanh chói tai. 
“Bây giờ cái nhà này - từng đồng tiền, từng bữa ăn - đều là tao kiếm về!”
Giọng bà cao lên, vỡ ra trong không gian chật hẹp, dội vào tường rồi bật ngược trở lại. 
“Ba mày vô dụng! Còn mày –” 
Bà bật cười, tiếng cười chua chát đến méo mó, không giống tiếng cười của một con người đang vui, mà giống như một thứ gì đó bị ép ra khỏi cổ họng.
 “Cũng chẳng khá hơn là bao!”
Chiếc gạt tàn trên bàn bị hất mạnh, bay thẳng về phía em. Em không né. Không phải vì không kịp, mà vì cơ thể em không phản ứng. Nó đập vào cánh tay, một cú đau nhói lan ra, rồi rơi xuống đất vỡ tan.
Âm thanh “choang” vang lên, những mảnh thủy tinh văng ra, lăn lóc trên nền nhà, phản chiếu ánh đèn thành những đốm sáng lạnh lẽo, lấp lánh như những mảnh vụn của thứ gì đó vừa bị phá hủy.
Cánh tay em nhanh chóng đỏ lên, cảm giác đau âm ỉ lan dần, nhưng em không kêu, không lùi lại. Em chỉ đứng đó, nhìn bà, ánh mắt không rõ là đang nhìn hay chỉ đơn giản là hướng về phía trước.
Bà thở dốc, lồng ngực phập phồng, như thể vừa trút ra một thứ gì đó tích tụ từ rất lâu. Một lúc sau, bà quay đi, chộp lấy túi xách, động tác gấp gáp, thô bạo.
“Ở đó mà than khóc đi!”
Giọng bà ném lại, đầy bực tức, như một mảnh đá cuối cùng ném xuống mặt nước đã quá đục.
Cánh cửa đóng sầm lại. “Rầm!” – Âm thanh vang lên, dội vào tường, rồi rơi xuống… im lặng. Nhưng sự im lặng lần này không giống trước, nó không trống rỗng, mà nặng nề, đặc quánh, như thể trong không khí vẫn còn vương lại dư âm của tất cả những gì vừa xảy ra.
Em đứng đó thêm một lúc, không biết là bao lâu. Rồi từ từ cúi xuống, nhặt lại balo, bước qua những mảnh vỡ dưới chân.
Mỗi bước đi đều cẩn thận, không phải vì sợ bị thương, mà như một thói quen vô thức – tránh làm vỡ thêm bất cứ thứ gì, dù là thứ đã không thể lành lại.
Em đi về phía căn phòng trong cùng.
Cánh cửa mở ra, ánh đèn vàng yếu ớt hắt xuống, nhuộm mọi thứ một màu cũ kỹ, mệt mỏi. Trên giường, ba em vẫn nằm đó, như mọi ngày, cơ thể bất động, hơi thở yếu ớt. Nhưng hôm nay có gì đó khác. 
Đôi mắt ông mở, không còn vô hồn như trước, mà ướt. Nước mắt lăn xuống, chậm rãi, không một tiếng động, trượt qua những nếp nhăn hằn sâu trên khuôn mặt gầy gò.
Ông nghe thấy hết.
Từng lời.
Từng câu.
Từng âm thanh.
Nhưng ông không thể nói. Không thể ngăn lại. Không thể làm gì ngoài việc nằm đó, để mọi thứ diễn ra ngay trước mặt mình như một vở kịch mà ông bị trói chặt vào ghế, không thể đứng lên.
Em đứng ở cửa. Một giây. Hai giây. Rồi chân em khuỵu xuống, như thể toàn bộ sức lực cuối cùng vừa bị rút cạn. Em quỳ bên mép giường, bàn tay run rẩy nắm lấy tay ông, lần này không còn giữ được sự bình tĩnh giả tạo nữa. 
“Ba…”
Giọng em vỡ ra, nhỏ, yếu, run rẩy, như thể chỉ cần thêm một chút nữa thôi là sẽ tan biến hoàn toàn. 
“…ba…”
Ngón tay siết chặt hơn, bám lấy bàn tay lạnh lẽo ấy như bám vào một thứ duy nhất còn sót lại, như sợ rằng nếu buông ra, không chỉ bàn tay đó biến mất… mà cả thế giới này cũng sẽ sụp đổ theo.
Và lần này –
Em thật sự sợ.
Sợ rằng mình sẽ không còn gì để giữ lại nữa.`,
    5: `CHƯƠNG 5: TUYỆT VỌNG

Những ngày sau đó, em vẫn đến trường. Nếu nhìn từ bên ngoài, mọi thứ dường như không thay đổi - vẫn là chiếc áo đồng phục cũ, vẫn là con đường quen thuộc, vẫn là cánh cổng sắt nặng nề mở ra mỗi buổi sáng. Nhưng chỉ có em biết, việc bước chân qua cánh cổng ấy không còn là “đi học” nữa. Nó giống như tự đưa mình đi qua một cánh cửa khác, nơi mọi thứ phía sau sẽ không còn giữ lại bất kỳ thứ gì thuộc về sự bình thường.
Ác mộng không bắt đầu bằng một cú đánh.
Nó bắt đầu bằng sự im lặng.
Những ánh mắt vẫn còn đó, nhưng không còn thì thầm nữa. Chúng công khai, thản nhiên, thậm chí có phần hả hê. Những người từng ngồi cạnh em, từng nói chuyện với em - dù chỉ là vài câu vô nghĩa - giờ đây đều tránh đi, như thể em mang theo một thứ gì đó có thể lây nhiễm. Ghế bên cạnh em luôn trống, bàn học không ai chạm vào, không ai vô tình va phải, không ai vô tình hỏi han. Không khí xung quanh em bị tách ra thành một khoảng riêng biệt, lạnh lẽo, vô hình nhưng rõ ràng đến mức chỉ cần đứng gần cũng có thể cảm nhận được.
Thầy cô cũng vậy.
Họ không nhìn em.
Hoặc nếu có nhìn, thì cũng chỉ là những ánh nhìn lướt qua, nhanh chóng và hờ hững, như thể em không tồn tại, hoặc không đáng để tồn tại. Những câu hỏi không bao giờ được gọi đến tên em, những bài kiểm tra không bao giờ được nhắc nhở, những lỗi sai không ai sửa. Em dần hiểu ra, sự tàn nhẫn không phải lúc nào cũng đến từ những lời nói cay nghiệt - đôi khi, nó chỉ đơn giản là sự lạnh nhạt kéo dài, đủ để khiến một con người tự biến mất.
Có lẽ, nếu phải tìm một chút gì đó gọi là ấm áp, thì đó là bác bảo vệ ở cổng trường và những cô chú trong căn tin. Bác bảo vệ đôi khi nhìn em lâu hơn một chút, ánh mắt không có sự khinh miệt như những người khác, chỉ là một sự lặng im khó hiểu. Những người trong căn tin đôi khi đưa thêm cho em một phần ăn nhỏ, hoặc ít nhất là không nhìn em bằng ánh mắt xa lánh. Nhưng những điều đó… nhỏ bé đến mức gần như không thể chạm tới được cái lạnh đang lan rộng trong em.
Và rồi, sự im lặng ấy không kéo dài quá lâu.
Nó bắt đầu biến dạng.
Rõ ràng hơn.
Thô bạo hơn.
Những lần bị chặn đường xuất hiện đầu tiên - ở hành lang vắng, ở góc cầu thang, ở phía sau dãy lớp học nơi ít người qua lại. Những “chị đại” của trường đứng đó, dựa vào tường, ánh mắt liếc qua em từ trên xuống dưới, chậm rãi, đánh giá, như thể đang xem xét một món đồ. 
“Nghe nói mày nổi tiếng lắm ha?” – Giọng nói của họ không lớn, nhưng mang theo sự trêu chọc lẫn khinh bỉ, từng chữ như kéo dài ra, quấn lấy tai người nghe.
Em không trả lời.
Không phải vì không có gì để nói.
Mà vì em biết, bất kỳ câu trả lời nào cũng không có ý nghĩa.
Nhưng sự im lặng của em không khiến mọi thứ dừng lại.
Nó chỉ khiến chúng… tiếp tục.
Những cánh cửa nhà vệ sinh bị đóng sầm lại phía sau lưng em, không gian chật hẹp lập tức trở nên tối và ngột ngạt. Tiếng cười vang lên, vang dội trên những bức tường gạch ẩm ướt. Một xô nước lạnh bất ngờ đổ xuống, thấm qua tóc, qua áo, qua da thịt, khiến cơ thể em co lại theo phản xạ. Tiếng nước nhỏ giọt xuống nền nhà, hòa lẫn với tiếng cười, tạo thành một thứ âm thanh méo mó, kéo dài.
Rồi đến những trò khác.
Sách vở bị xé nát ngay trước mặt em, từng trang giấy rơi xuống như những mảnh vụn của thứ gì đó từng có ý nghĩa. Tóc bị kéo mạnh, bị cắt đi một cách thô bạo, từng lọn rơi xuống sàn mà không có cơ hội quay lại. Sữa bị tạt thẳng vào người, dính lại trên áo, trên da, tạo thành một lớp dính nhớp nháp, khó chịu đến buồn nôn. Quần áo bị kéo rách, những tiếng vải xé vang lên ngắn gọn nhưng đủ để khiến lòng người co thắt. Và rồi… những cú đánh. Không quá mạnh để gây chú ý, nhưng đủ đau để để lại dấu vết – trên da, và ở sâu hơn thế.
Cơ thể em dần không còn chỗ nào lành lặn.
Những vết bầm chồng lên nhau, cũ chưa tan đã có cái mới đè lên. Có những vết là từ mẹ, có những vết là từ trường, và dần dần, em không còn phân biệt được chúng đến từ đâu nữa. Tất cả hòa lẫn vào nhau, trở thành một phần của cơ thể, một phần của sự tồn tại mà em không thể tách ra.
Có những lúc em tự hỏi… mình đang chịu đựng điều này vì điều gì.
Nhưng câu hỏi đó không có câu trả lời.
Và rồi, vào một ngày, khi mọi thứ đã chạm đến giới hạn mà chính em cũng không biết là tồn tại, em bước đến văn phòng giáo viên.
Không suy nghĩ.
Không do dự.
Chỉ đơn giản là… đi.
Cánh cửa mở ra, ánh sáng bên trong khác với bên ngoài – sáng hơn, rõ ràng hơn, như một thế giới khác mà em chưa từng thuộc về. Trong phòng, các thầy cô đang làm việc, nói chuyện, lật giấy tờ, những âm thanh bình thường đến mức xa lạ.
Em bước vào.
Rồi dừng lại.
Không ai nhìn em ngay lập tức.
Không ai hỏi em đến làm gì.
Em đứng đó một lúc, cảm giác như mình đang đứng sai chỗ, như thể chỉ cần thêm một giây nữa thôi là sẽ bị đuổi ra ngoài.
Nhưng rồi – Chân em khuỵu xuống.
Không phải vì yếu.
Mà vì… em không còn cách nào khác.
Em quỳ.
Ngay giữa phòng.
Đầu cúi thấp, bàn tay siết chặt vào nhau đến mức run lên.
“Thầy… cô…”
Giọng em phát ra, nhỏ, khàn, vỡ vụn, như thể từng chữ đều phải kéo ra từ nơi sâu nhất trong lồng ngực.
“…cứu em với…”
Không gian chững lại.
Có người nhìn lên.
Có người dừng tay.
Nhưng không có ai đứng dậy.
“…em đau lắm…”
Câu nói ấy rơi xuống, nhẹ đến mức gần như không có trọng lượng, nhưng lại nặng đến mức khiến chính em cảm thấy khó thở.
Một khoảng lặng kéo dài.
Không ai đến gần.
Không ai đỡ em dậy.
Không ai hỏi thêm một câu.
Chỉ có những ánh mắt.
Nhưng không phải là ánh mắt của sự thương cảm.
Mà là sự khó chịu.
Lúng túng.
Và… tránh né.
Rồi, một người đàn ông đứng lên.
Giáo viên chủ nhiệm của em.
Ông chỉnh lại gọng kính, động tác chậm rãi, như thể đang suy nghĩ về một điều gì đó rất quan trọng. Ánh mắt ông nhìn xuống em, không giận dữ, không thương hại – chỉ là một sự thờ ơ lạnh lẽo, pha lẫn chút gì đó giống như… khinh khỉnh.
“Em không làm gì…”
Giọng ông trầm, đều, từng chữ rõ ràng.
“…thì sao người ta ghét em?”
Câu nói ấy không lớn.
Không gắt.
Không mang theo bất kỳ cảm xúc mạnh nào.
Nhưng nó rơi xuống – và vỡ ra.
Ngay trong lòng em.
Không phải đau theo cách của những cú đánh.
Mà là một thứ gì đó khác.
Một thứ… khiến tất cả những gì còn sót lại bên trong em sụp xuống.
Trong khoảnh khắc đó, em hiểu ra.
Không có ai đứng về phía mình.
Không có nơi nào để quay về.
Không có lối thoát.
Đóa hoa hướng dương trong em – thứ duy nhất từng hướng về ánh sáng - cuối cùng cũng lụi tàn.
Không ồn ào.
Không kịch tính.
Chỉ là… tắt đi.
Từ ngày hôm đó, em không còn cố gắng nữa.
Không còn phản ứng.
Không còn chống cự.
Em thu mình lại, khép kín mọi thứ, khoác lên một lớp vỏ vô cảm và im lặng tuyệt đối. Thế giới bên ngoài tiếp tục vận động – mùa thu trôi qua, mùa đông lại đến – nhưng đối với em, tất cả chỉ là những khoảng thời gian chồng lên nhau, không còn ý nghĩa.
Dưới lớp vải áo thô sơ, cơ thể em không còn chỗ nào lành lặn.
Nhưng điều đó… cũng không còn quan trọng nữa.`,
    6: `CHƯƠNG 6: CHU KHÁNH TRÌ

Giữa khu phố xập xệ nơi những bức tường loang lổ bốc lên mùi ẩm mốc và rác thải, nơi ánh đèn đường hiếm hoi không đủ xua đi bóng tối mà chỉ khiến nó trở nên rõ ràng hơn, Chu Khánh Trì tồn tại như một phần của chính không gian ấy – không nổi bật, không ồn ào, nhưng lại mang theo một thứ gì đó khiến người ta theo bản năng mà tránh xa. 
Người ta nói hắn giống như một bóng ma của tai ương, không phải vì hắn làm gì, mà vì sự hiện diện của hắn luôn gợi lên cảm giác rằng nơi nào có hắn, nơi đó sẽ không có điều gì tốt đẹp xảy ra.
Hắn mười tám tuổi, gầy đến mức có thể nhìn thấy rõ từng đường xương dưới lớp áo mỏng, nhưng cơ thể ấy lại không mang vẻ yếu ớt, mà giống như một sợi dây căng quá mức - chỉ cần chạm nhẹ cũng có thể đứt, nhưng trước khi đứt, nó có thể cứa vào tay người khác đến rỉ máu. Đôi tay hắn lúc nào cũng dính dầu máy, những vết bẩn ăn sâu vào da, không rửa sạch được, như thể đã trở thành một phần của hắn từ rất lâu rồi. Nhưng thứ khiến người ta sợ không phải là vẻ ngoài đó, mà là ánh mắt - lạnh, sâu, và trống rỗng đến mức không phản chiếu bất cứ thứ gì, như thể hắn đã nhìn thấy quá nhiều thứ mà lẽ ra một con người không nên nhìn thấy.
Người ta không biết rõ về hắn.
Chỉ biết rằng hắn sống ở cuối con hẻm, trong một căn nhà gần như sắp sập, nơi mỗi khi mưa xuống là nước dột từng giọt qua mái tôn thủng lỗ chỗ, rơi xuống nền nhà lạnh lẽo. Nơi đó không có tiếng cười, không có ánh sáng, chỉ có tiếng chửi rủa, tiếng đồ vật vỡ, và đôi khi… là tiếng va đập của da thịt vào thứ gì đó cứng.
Đêm xuống, khu phố càng trở nên tĩnh lặng.
Nhưng sự tĩnh lặng ấy không phải là bình yên.
Mà là chờ đợi.
Trong căn nhà đó, ánh đèn vàng yếu ớt hắt ra từ khe cửa, chập chờn như sắp tắt. Bên trong, một người đàn ông ngồi dựa vào tường, chai rượu rỗng lăn lóc dưới chân. Hơi rượu nồng nặc tràn ngập không gian, trộn lẫn với mùi ẩm mốc và mồ hôi lâu ngày không giặt. Đôi mắt ông ta đỏ ngầu, nhìn chằm chằm vào khoảng không trước mặt, như thể đang tìm kiếm một thứ gì đó không tồn tại.
Cánh cửa bật mở.
Chu Khánh Trì bước vào.
Không nói gì.
Không nhìn ai.
Chỉ đơn giản là bước qua.
“Đứng lại.”
Giọng nói khàn đặc vang lên phía sau, kéo lê từng chữ như thể mỗi âm tiết đều nặng trĩu. Hắn dừng lại, nhưng không quay đầu.
“Tiền đâu?”
Không có câu trả lời.
Không phải vì hắn không nghe thấy.
Mà vì hắn không có gì để trả lời.

Một khoảng lặng ngắn ngủi, rồi –
“Con mẹ mày… tao hỏi mày không nghe à?!”
Tiếng chai thủy tinh bị ném mạnh xuống đất vang lên “choang”, mảnh vỡ văng ra khắp nơi. Người đàn ông đứng bật dậy, bước chân loạng choạng nhưng đầy bạo lực, tiến về phía hắn. Bàn tay thô ráp túm lấy cổ áo hắn, kéo giật lại.
“Mày đi làm cả ngày… tiền đâu?!”
Chu Khánh Trì không chống cự.
Cũng không giải thích.
Chỉ đứng đó, để mặc cho lực kéo làm cơ thể nghiêng đi.
“Không có.”
Giọng hắn thấp, gần như không mang theo cảm xúc.
Chỉ hai chữ.
Nhưng đủ để châm ngòi.
Cú đấm giáng xuống.
Nhanh.
Mạnh.
Đập thẳng vào mặt hắn, khiến đầu hắn lệch sang một bên. Máu lập tức trào ra nơi khóe môi, tanh và nóng, nhưng hắn không kêu, cũng không lùi lại. Cú thứ hai, thứ ba tiếp tục rơi xuống, nặng nề, dồn dập, như thể người đàn ông kia đang trút hết tất cả những thứ tích tụ trong người mình lên cơ thể gầy gò trước mặt.
“Không có?!”
“Mày ăn cái gì mà sống hả?!”
“Đồ vô dụng! Giống hệt con mẹ mày!”
Mỗi câu chửi là một cú đánh.
Mỗi cú đánh là một lần cơ thể hắn rung lên.
Nhưng hắn vẫn đứng đó.
Không phản kháng.
Không né tránh.
Chỉ im lặng chịu đựng, như thể đây là một phần của cuộc sống mà hắn đã quen đến mức không còn cảm giác gì nữa.
Ở góc phòng, một người phụ nữ ngồi co ro, tay ôm chặt một xấp tiền lẻ, ánh mắt lảng tránh, không dám nhìn về phía đó. Bà không can ngăn, không lên tiếng, chỉ cúi đầu, như thể tất cả những gì đang diễn ra không liên quan đến mình.
“Đánh nữa đi…”
Giọng Chu Khánh Trì vang lên, khẽ đến mức gần như bị nuốt mất trong không khí.
Người đàn ông khựng lại.
“Đánh cho xong đi.”
Hắn ngẩng đầu, ánh mắt nhìn thẳng, không có thách thức, không có tức giận - chỉ là một sự trống rỗng đến lạnh người.
“Dù gì… ông cũng chỉ làm được thế thôi mà.”
Một giây im lặng.
Rồi –
Cơn giận bùng lên dữ dội hơn.
Nhưng lần này, không chỉ là đánh.
Mà là đập phá.
Tiếng đồ vật vỡ.
Tiếng chửi rủa.
Tiếng va đập.
Và trong tất cả những âm thanh hỗn loạn đó, Chu Khánh Trì vẫn đứng đó, như một cái bóng không thể bị xóa bỏ, dù có bị đập nát đến mức nào.
Đêm đó, hắn bước ra khỏi nhà khi mọi thứ đã lắng xuống.
Không ai giữ hắn lại.
Cũng không ai hỏi hắn đi đâu.
Gió lạnh táp vào mặt, làm khô đi vết máu còn sót lại nơi khóe môi. Hắn đưa tay lau qua loa, nhìn xuống lòng bàn tay dính máu, rồi siết lại, như thể muốn bóp nát cả cảm giác còn sót lại trong cơ thể.
Hắn không cảm thấy đau.
Không phải vì không bị thương.
Mà vì… đau đã trở thành một trạng thái quen thuộc.
Quen đến mức không còn được coi là đau nữa.
Hắn bước đi trong con hẻm tối, bóng lưng hòa vào bóng đêm, không để lại dấu vết gì rõ ràng. Nhưng sâu bên trong, có thứ gì đó vẫn còn sót lại—không phải là hy vọng, cũng không phải là tuyệt vọng.
Chỉ là… một khoảng trống.
Rộng.
Sâu.
Và không đáy.
Và chính khoảng trống đó –
Sau này, lại vô tình chứa thêm một người.`,
    7: `CHƯƠNG 7: BÓNG TỐI GẶP BÓNG TỐI

Đêm đó, tuyết rơi dày hơn những ngày trước, không phải kiểu lất phất nhẹ nhàng mà là thứ trắng xóa đến nhức mắt, phủ kín mọi thứ như muốn xóa đi dấu vết của cả thành phố.
Ánh đèn đường vàng vọt hắt xuống mặt đất, phản chiếu trên lớp tuyết lạnh tạo thành một thứ ánh sáng mờ đục, khiến mọi thứ trở nên xa lạ và méo mó, như thể em đang bước đi trong một giấc mơ cũ kỹ mà chính mình cũng không còn nhớ rõ.
Gió thổi từng cơn, luồn qua cổ áo, xuyên qua lớp vải mỏng, cắt vào da thịt một cách lạnh lẽo, nhưng em không rùng mình, cũng không dừng lại. Cơ thể đã quen với cái lạnh đó, hoặc có lẽ… đã không còn đủ cảm giác để nhận ra nó nữa.

Con đường về nhà vắng lặng. Không tiếng người. Không tiếng xe. Chỉ có tiếng bước chân của em in xuống nền tuyết, lún sâu rồi mất hút, như chưa từng tồn tại. Mọi thứ đều giống như mọi ngày - cho đến khi em đi ngang qua con hẻm nhỏ dẫn vào khu phố cũ.
Em không định nhìn.
Không định quan tâm.
Nhưng rồi – Tiếng thở.
Nặng.
Đứt quãng.
Rơi vào tai em một cách rõ ràng đến mức không thể giả vờ như không nghe thấy.
Bước chân em khựng lại.
Không phải vì tò mò.
Mà là vì… thứ âm thanh đó.
Nó quá quen.
Quen đến mức khiến lồng ngực em chợt thắt lại một nhịp, như thể cơ thể nhận ra điều gì đó mà lý trí còn chưa kịp hiểu.
Em quay đầu.
Ở góc hẻm, dưới ánh đèn yếu ớt, một bóng người dựa vào tường.
Chu Khánh Trì.
Hắn gần như hòa lẫn vào bóng tối, nếu không phải vì lớp tuyết trắng phản chiếu xung quanh, có lẽ em đã không nhìn thấy hắn. Cơ thể hắn nghiêng lệch, một bên vai tựa vào tường, đầu hơi cúi xuống, mái tóc ướt bết lại vì tuyết tan. Máu thấm ra từ những vết thương trên người, chảy xuống, nhỏ giọt lên nền tuyết trắng, loang ra thành những vệt đỏ sẫm, nổi bật đến tàn nhẫn.
Có lẽ vừa xảy ra một trận ẩu đả.
Không phải kiểu xô xát bình thường.
Mà là kiểu… một chấp mười.
Và hắn… vẫn còn đứng được.
Tiếng thở của hắn nặng nề, từng nhịp kéo dài như bị xé ra khỏi lồng ngực. Mỗi lần hít vào là một lần lồng ngực co thắt, mỗi lần thở ra là một âm thanh khàn đặc, như thể hơi thở cũng trở thành gánh nặng.
Em đứng đó.
Không bước lại.
Cũng không quay đi.
Trong đầu em không có suy nghĩ gì rõ ràng, chỉ là một khoảng trống quen thuộc, nhưng lần này, trong khoảng trống đó lại có một thứ gì đó khác – một cảm giác rất nhỏ, rất yếu, nhưng đủ để khiến em không thể tiếp tục bước như bình thường.
Không liên quan đến mình.
Em đã từng nghĩ như vậy.
Đã từng nói với chính mình như vậy.
Nhưng chân em… không nghe lời.
Em bước lại gần.
Chậm.
Như thể mỗi bước đều cần phải vượt qua một ranh giới vô hình nào đó.
Khi khoảng cách đủ gần, em nhìn rõ hơn.
Gương mặt hắn tái nhợt, môi rách, má sưng, những vết trầy xước chằng chịt kéo dài từ cổ xuống đến cổ áo. Áo khoác bị rách ở vai, lộ ra lớp áo bên trong cũng đã thấm máu. Nhưng ánh mắt hắn – vẫn mở. Không hoàn toàn tỉnh táo, nhưng cũng không hẳn là mất ý thức. Chỉ là… lạc lõng.
Hắn nhận ra có người đứng trước mặt mình.
Ánh mắt khẽ động.
Nhưng không nói gì.
Cũng không tỏ ra ngạc nhiên.
Như thể việc có người nhìn thấy mình trong trạng thái này… cũng chẳng có gì quan trọng.
Em cúi xuống một chút.
Khoảng cách gần đến mức có thể nghe rõ hơi thở của hắn, cảm nhận được hơi lạnh tỏa ra từ cơ thể gần như đã mất hết nhiệt độ.
“…Anh sẽ chết đấy.”
Giọng em vang lên, nhỏ, đều, không có cảm xúc rõ ràng.
Không phải là lo lắng.
Cũng không phải là cảnh báo.
Chỉ là… một sự thật.
Chu Khánh Trì khẽ cười – Một tiếng cười rất nhẹ, gần như không thành tiếng, nhưng đủ để làm rung lên vết thương nơi khóe môi, khiến máu lại rỉ ra.
“Ừ.”
Hắn đáp.
Ngắn.
Không do dự.
Như thể cái chết… cũng không phải là điều gì đáng để bận tâm.
Em im lặng.
Một giây.
Hai giây.
Rồi hỏi, giọng vẫn đều như cũ:
“…Có đứng dậy được không?”
Hắn không trả lời ngay.
Chỉ nhìn em.
Ánh mắt đó… không rõ là đang nhìn em, hay đang nhìn xuyên qua em, đến một nơi nào đó xa hơn.
“…Không biết.”
Cuối cùng, hắn nói.
Giọng khàn, thấp, đứt quãng.
Em không nói thêm gì.
Chỉ đưa tay ra.
Động tác chậm, không vội, như thể chính em cũng không hiểu tại sao mình lại làm vậy.
Bàn tay dừng lại trước mặt hắn.
Không chạm vào.
Chỉ… ở đó.
Chu Khánh Trì nhìn bàn tay ấy.
Một lúc lâu.
Rồi khẽ nhíu mày, như thể không hiểu.
“Làm gì?”
Hắn hỏi.
Em không rút tay lại.
“…Đứng dậy.”
Hắn im lặng.
Ánh mắt dừng lại trên tay em, rồi chậm rãi chuyển lên gương mặt em.
Trong khoảnh khắc đó, có thứ gì đó rất khẽ lướt qua trong ánh mắt hắn - không rõ ràng, không đủ lâu để gọi tên.
“…Tại sao?”
Câu hỏi bật ra, khàn đặc, không phải nghi ngờ, mà giống như một phản xạ vô thức.
Em không trả lời ngay.
Có lẽ vì chính em… cũng không có câu trả lời.
Chỉ là –
Nếu quay đi.
Nếu bỏ mặc.
Thì hình ảnh này… sẽ ở lại.
Giống như rất nhiều thứ khác.
Và em… không muốn mang thêm bất kỳ thứ gì nữa.
“…Không biết.”
Cuối cùng, em nói.
Giống hệt hắn lúc nãy.
Chu Khánh Trì nhìn em thêm một lúc.
Rồi, rất chậm, rất khó khăn, hắn đưa tay lên.
Nắm lấy tay em.
Bàn tay hắn lạnh.
Không phải cái lạnh của tuyết.
Mà là cái lạnh của một cơ thể đã cạn kiệt.
Em kéo hắn dậy.
Không mạnh.
Cũng không nhẹ.
Chỉ đủ để hắn có thể đứng lên, dù cơ thể vẫn lảo đảo.
Hắn dựa vào em.
Một chút.
Rất khẽ.
Nhưng đủ để em cảm nhận được trọng lượng của hắn – không chỉ là cơ thể, mà là tất cả những gì hắn mang theo.
Em không nói gì.
Chỉ quay người.
Dẫn hắn đi.
Qua con hẻm.
Qua lớp tuyết.
Đến trạm y tế nhỏ ở cuối phố, nơi ánh đèn vẫn còn sáng.
Cánh cửa mở ra, hơi ấm tràn ra ngoài, đối lập hoàn toàn với cái lạnh bên ngoài. Có người bước tới, hỏi gì đó, nhưng em không nhớ rõ. Mọi thứ diễn ra như một chuỗi hành động đã được lập trình sẵn – đỡ hắn vào trong, đặt hắn xuống, để người khác tiếp nhận.
Đến khi buông tay ra –
Em mới nhận ra.
Tay mình… vẫn còn lạnh.
Nhưng không còn là cái lạnh của riêng mình nữa.
Đêm đó, em rời khỏi trạm y tế khi tuyết vẫn còn rơi.
Không ai giữ em lại.
Cũng không ai hỏi em là ai.
Cánh cửa khép lại phía sau, cắt đứt ánh sáng.
Em bước đi.
Trở về con đường cũ.
Nhưng có thứ gì đó… đã khác.
Rất nhỏ.
Rất mơ hồ.
Như một vết nứt xuất hiện trên bức tường vốn tưởng đã không thể thay đổi.
Và từ vết nứt đó – Định mệnh bắt đầu len vào.
Chậm rãi.
Âm thầm.
    Dùng những mảnh vỡ của cả hai con người… ghép lại thành một thứ gì đó không tên, không rõ hình dạng, cũng không biết sẽ dẫn đến đâu.`,
    8: `CHƯƠNG 8: TÌM EM

Khi Chu Khánh Trì tỉnh lại, thứ đầu tiên hắn cảm nhận được không phải là cơn đau, mà là sự trống rỗng. Mùi thuốc sát trùng nhàn nhạt len vào khứu giác, ánh đèn trắng lạnh lẽo treo trên trần chiếu thẳng xuống khiến mọi thứ trở nên quá rõ ràng, rõ đến mức khó chịu. Hắn nằm đó, không nhúc nhích ngay, chỉ mở mắt nhìn trần nhà một lúc lâu, như thể đang cố nhớ lại mình đã đến đây bằng cách nào, hoặc có lẽ… đang xác nhận rằng mình vẫn còn sống. Cơn đau đến sau đó, chậm nhưng dứt khoát, lan từ những vết thương trên cơ thể ra khắp nơi, kéo hắn trở về thực tại một cách tàn nhẫn.
Hắn chống tay ngồi dậy, động tác chậm, cứng, từng cơ bắp như bị kéo căng đến mức chỉ cần thêm một chút lực nữa thôi cũng có thể rách ra. Vết thương ở vai nhói lên, hơi thở khựng lại trong một nhịp ngắn, nhưng hắn không dừng, chỉ nghiêng đầu nhìn quanh căn phòng nhỏ. Không có ai. Chỉ có một chiếc giường trống bên cạnh, một cái bàn kim loại, và tiếng đồng hồ tích tắc vang lên đều đặn như đang đếm từng giây một cách vô nghĩa.
Ký ức quay trở lại từng mảnh rời rạc. Tuyết. Máu. Con hẻm. Và… một bàn tay.
Hắn khựng lại trong một giây.
Ánh mắt khẽ động, như thể có thứ gì đó vừa chạm vào một góc rất sâu trong đầu mà hắn không quen đối diện.
Cửa phòng mở ra.
Một y tá bước vào, tay cầm khay thuốc, ánh mắt thoáng bất ngờ khi thấy hắn đã tỉnh. 
“Cậu tỉnh rồi à? May đấy, tưởng phải nằm thêm mấy hôm nữa.” 
Giọng nói bình thường, không có gì đặc biệt, nhưng lại khiến không gian bớt đi một chút lạnh lẽo vô nghĩa.
Chu Khánh Trì nhìn cô ta, ánh mắt dừng lại một nhịp, rồi hỏi, giọng khàn đặc vì lâu không nói: 
“Người đưa tôi vào đâu?”
Y tá đặt khay xuống, hơi nghiêng đầu như đang nhớ lại. 
“À… một cô bé. Tầm tuổi học sinh. Đưa cậu tới đây tối qua.”
Cô ngừng một chút, rồi nói tiếp, giọng nhẹ hơn: 
“Đóng luôn viện phí rồi. Không để lại tên.”
Không để lại tên.
Bốn chữ đó rơi xuống, rất nhẹ, nhưng lại vang lên trong đầu hắn lâu hơn bình thường.
“…Đi rồi?” – Hắn hỏi lại, như thể cần xác nhận.
“Ừ. Đi lâu rồi.” – Y tá đáp, rồi nhìn hắn một cái, có chút tò mò – “Người quen à?”
Chu Khánh Trì không trả lời.
Không phải vì không muốn.
Mà vì… hắn không biết phải trả lời thế nào.
Người quen?
Không.
Người lạ?
Cũng không hẳn.
Hắn chỉ nhớ một bàn tay chìa ra trong đêm, một giọng nói không có cảm xúc, và một ánh mắt… không giống bất kỳ ai mà hắn từng gặp.
Hắn cúi xuống, nhìn bàn tay mình.
Những vết dầu máy vẫn còn, những vết xước chưa lành, nhưng đâu đó… vẫn còn sót lại một cảm giác rất mơ hồ.
Như thể có thứ gì đó đã từng chạm vào.
Và chưa hoàn toàn biến mất.
Hắn đứng dậy, mặc kệ lời nhắc nhở của y tá phía sau, mặc kệ cơ thể vẫn chưa hồi phục, từng bước đi chậm nhưng không do dự. Hắn không biết mình đi đâu. Chỉ đơn giản là… bước ra khỏi nơi đó, như thể nếu ở lại thêm một giây nữa thôi, thứ cảm giác mơ hồ kia sẽ tan biến hoàn toàn.
Bên ngoài, trời vẫn xám.
Tuyết đã ngừng rơi, nhưng cái lạnh vẫn còn đó, len lỏi vào từng góc phố. Hắn đứng trước cửa trạm y tế một lúc, ánh mắt quét qua con đường vắng, như thể đang tìm kiếm một thứ gì đó không rõ hình dạng.
Rồi hắn bước đi.
Không có mục đích.
Chỉ là… đi.
Nhưng rồi, không hiểu vì sao, bước chân hắn lại dẫn hắn đến trước cổng trường.
Ngôi trường cũ kỹ, tường sơn bạc màu, sân trường rộng nhưng trống trải. Hắn đứng bên kia đường, dựa vào cột điện, ánh mắt dừng lại ở cánh cổng sắt, nơi từng tốp học sinh ra vào, cười nói, ồn ào.
Hắn không cần tìm lâu.
Em ở đó.
Không nổi bật.
Không khác biệt.
Nhưng hắn nhận ra ngay.
Có lẽ vì… em vẫn giống như đêm hôm đó.
Lặng lẽ.
Xa cách.
Như thể đứng giữa rất nhiều người, nhưng lại không thuộc về nơi đó.
Hắn nhìn em.
Không bước lại.
Không gọi.
Chỉ đứng đó, từ xa, quan sát.
Và rồi hắn thấy.
Thấy những ánh mắt xung quanh em.
Thấy cách người ta né tránh.
Thấy những nụ cười không che giấu.
Thấy những hành động nhỏ nhặt nhưng đủ để hiểu.
Hắn không cần nghe.
Cũng không cần hỏi.
Chỉ cần nhìn… là đủ.
Một cảm giác rất lạ xuất hiện trong lòng hắn.
Không phải tức giận.
Không phải thương hại.
Chỉ là… một sự khó chịu mơ hồ, giống như có thứ gì đó không đúng đang diễn ra, nhưng hắn không có ý định sửa chữa.
Hắn quay đi.
Nhưng bước chân không rời khỏi nơi đó.
Ngày hôm sau.
Hắn lại đến.
Vẫn đứng ở đó.
Vẫn nhìn.
Vẫn không làm gì.
Cứ như vậy, ngày qua ngày.
Hắn không bước vào thế giới của em.
Không phá vỡ khoảng cách.
Chỉ đi phía sau.
Giữa những con đường em đi qua.
Giữa những ngã rẽ mà em không hề biết rằng có một người đang tồn tại phía sau mình.
Có lần, em dừng lại.
Quay đầu.
Ánh mắt lướt qua nơi hắn đứng.
Chỉ một giây.
Rồi quay đi.
Như thể hắn… chưa từng tồn tại.
Chu Khánh Trì đứng đó.
Không tiến lên.
Cũng không rời đi.
Trong lòng hắn không có suy nghĩ rõ ràng nào, chỉ là một cảm giác rất mơ hồ - giống như lần đầu tiên trong đời, hắn nhìn thấy một thứ gì đó giống mình, nhưng lại không hoàn toàn giống.
Và hắn…
Không muốn rời mắt khỏi nó.
Không phải để giữ lấy.
Mà chỉ để chắc rằng –
Nó vẫn còn ở đó.
Dù chỉ là… từ phía sau.`,
    9: `CHƯƠNG 9: GIỮ KHOẢNG CÁCH

Những ngày sau đó, việc có một cái bóng đi phía sau dần trở thành một thứ gì đó quen thuộc đến mức khó chịu.
Ban đầu, em không quay lại, không nhìn, không xác nhận, như thể chỉ cần giả vờ không biết thì sự tồn tại ấy sẽ tự biến mất giống như bao thứ khác từng lướt qua cuộc đời em mà không để lại dấu vết.
Nhưng hắn không biến mất. 
Khoảng cách luôn được giữ vừa đủ - không gần đến mức chạm vào, cũng không xa đến mức hoàn toàn biến mất khỏi tầm nhìn. Một sự tồn tại lặng lẽ, kiên trì, không lời giải thích, không mục đích rõ ràng, khiến em bắt đầu cảm thấy ngột ngạt theo một cách rất khác, không phải kiểu bạo lực rõ ràng có thể né tránh, mà là một thứ gì đó âm ỉ, bám dính, khiến người ta không thể dứt ra.
Em bắt đầu để ý. 
Không phải vì tò mò, mà vì không thể không để ý.
Những lúc rẽ vào con hẻm quen, những lúc dừng lại trước cửa tiệm tạp hóa, hay chỉ đơn giản là khi đứng chờ đèn đỏ - em luôn cảm nhận được ánh mắt đó ở phía sau, không nhìn trực diện, nhưng đủ để biết rằng nó đang tồn tại. Không có sự xâm phạm, không có hành động cụ thể, nhưng chính sự im lặng ấy lại khiến mọi thứ trở nên nặng nề hơn, như thể hắn đang chờ đợi một điều gì đó mà ngay cả bản thân hắn cũng không biết là gì.
Và rồi, vào một buổi chiều, khi bầu trời xám đục như mọi ngày, em dừng lại.
Không phải vì mệt.
Không phải vì ngẫu nhiên.
Mà là vì… đủ rồi.
Con đường vắng, gió lùa qua những bức tường cũ, mang theo cái lạnh len vào từng kẽ áo. Em đứng giữa đường, không quay đầu ngay lập tức, chỉ đứng yên một giây, hai giây, để chắc chắn rằng bước chân phía sau cũng đã dừng lại. Rồi em quay lại.
Ánh mắt em chạm thẳng vào hắn.
Không né tránh.
Không do dự.
Không còn sự im lặng thờ ơ như trước.
Mà là một sự bất cần lạnh lẽo, như thể mọi thứ đã chạm đến giới hạn mà em không muốn chịu đựng thêm nữa.
Chu Khánh Trì đứng đó, cách em vài bước chân. Áo khoác jeans sờn cũ phủ lên người, lớp vải thấm hơi lạnh khiến nó trở nên nặng nề, nhưng hắn không có ý định kéo lại hay chỉnh sửa. Hai tay buông thõng bên người, không phòng thủ, không căng thẳng, chỉ đơn giản là đứng đó, như thể đã dự đoán trước khoảnh khắc này từ rất lâu.
Không ai nói gì trong vài giây đầu tiên.
Không gian giữa hai người như bị kéo căng ra, mỏng đến mức chỉ cần một câu nói cũng có thể làm nó vỡ vụn.
“Anh đi theo tôi làm gì?”
Giọng em vang lên trước, không lớn, không gắt, nhưng lạnh và thẳng, từng chữ rơi xuống rõ ràng như không cho phép bất kỳ sự vòng vo nào tồn tại.
Chu Khánh Trì không trả lời ngay.
Hắn nhìn em.
Không phải kiểu nhìn đánh giá, cũng không phải dò xét.
Chỉ là… nhìn.
Như thể đang cố tìm một câu trả lời mà chính hắn cũng chưa từng nghĩ đến.
“Tôi không biết.”
Giọng hắn trầm, thấp, lạnh, nhưng lại mang theo một thứ gì đó rất khó gọi tên – không phải yếu đuối, cũng không phải bất cần, mà là một sự mệt mỏi âm thầm, như thể câu trả lời đó không phải là né tránh, mà là sự thật duy nhất mà hắn có thể đưa ra.
Em không nhíu mày.
Không tỏ ra ngạc nhiên.
Chỉ nhìn hắn thêm một giây, rồi nói tiếp, giọng vẫn đều, nhưng lạnh hơn một chút: 
“Tôi không có tiền.”
Một câu nói ngắn, như một thói quen phòng vệ đã ăn sâu vào bản năng – mọi mối tiếp cận đều phải có lý do, và lý do phổ biến nhất… luôn là tiền.
Chu Khánh Trì khẽ lắc đầu, rất nhẹ, gần như không nhận ra.
“Tôi đâu có cần tiền của em.”
Không nhanh, không vội, câu trả lời của hắn đơn giản đến mức không có chỗ cho sự hiểu lầm.
Nhưng em vẫn không buông.
“Tôi chưa đủ tuổi.”
Lần này, giọng em không thay đổi, vẫn là sự lạnh lẽo quen thuộc, nhưng sâu bên trong, có một chút gì đó như đang thử thách - không phải thử hắn, mà là thử chính mình, thử xem liệu còn điều gì có thể khiến đối phương lộ ra ý định thật sự.
Chu Khánh Trì khẽ nhíu mày.
Không phải vì khó chịu.
Mà như thể lần đầu tiên nhận ra cách em nhìn thế giới.
“Em nghĩ nhiều rồi.”
Hắn đáp, giọng thấp hơn, chậm hơn, không có ý trách móc, chỉ đơn giản là một sự phủ nhận nhẹ nhàng.
Không gian lại rơi vào im lặng.
Gió thổi qua, mang theo cái lạnh len vào giữa hai người, nhưng không ai động đậy.
Em nhìn hắn.
Hắn nhìn lại.
Không ai lùi.
Không ai tiến.
Một khoảng cách cố định, như thể nếu ai đó bước thêm một bước nữa thôi, mọi thứ sẽ thay đổi theo cách mà cả hai đều chưa sẵn sàng đối mặt.
Chu Khánh Trì cúi đầu.
Động tác rất nhỏ, rất chậm, như một phản xạ mà chính hắn cũng không ý thức rõ. Khi hắn lên tiếng lần nữa, giọng nói đã thấp xuống, không còn lạnh lẽo như trước, mà gần giống… một tiếng thở dài.
“Cho phép tôi đi sau lưng em đi.”
Câu nói ấy không mang theo yêu cầu.
Cũng không phải mệnh lệnh.
Chỉ là… một lời đề nghị đơn giản đến mức gần như không có trọng lượng, nhưng lại chứa đựng một thứ gì đó nặng hơn tất cả những gì hắn đã nói trước đó.
“Tôi hứa sẽ không làm phiền em.”
Lời hứa.
Một thứ mà trong thế giới của em… gần như không tồn tại.
Em nhìn hắn.
Lâu hơn.
Lâu đến mức chính em cũng không biết mình đang tìm kiếm điều gì trong ánh mắt kia.
Không phải sự chân thành.
Không phải sự thương hại.
Cũng không phải bất kỳ cảm xúc nào rõ ràng.
Chỉ là… một khoảng trống.
Giống hệt mình.
Trong khoảnh khắc đó, có thứ gì đó rất khẽ dao động trong lòng em – không phải tin tưởng, cũng không phải chấp nhận, chỉ là một sự chững lại, rất nhỏ, rất mơ hồ, như thể có một phần nào đó trong em vừa nhận ra rằng… mình không phải là người duy nhất mang theo khoảng trống ấy.
Nhưng cảm giác đó chỉ tồn tại trong một giây.
Rồi biến mất.
Em quay đi.
Không trả lời.
Không từ chối.
Cũng không đồng ý.
Chỉ đơn giản là… quay đi.
Bước tiếp.
Như thể cuộc đối thoại vừa rồi chưa từng xảy ra.
Phía sau, Chu Khánh Trì đứng đó thêm một lúc.
Rồi cũng bước.
Không gần hơn.
Không xa hơn.
Vẫn giữ nguyên khoảng cách ấy.
Giữa hai con người.
Giữa hai thế giới.
Và từ ngày hôm đó – Khoảng cách ấy… được chấp nhận… một cách lặng lẽ.`,
    10: `CHƯƠNG 10: BÊN CẠNH

Những ngày sau đó trôi qua trong một nhịp điệu lặng lẽ đến mức nếu không để ý, người ta sẽ nghĩ rằng chẳng có gì thay đổi. Em vẫn đi học, vẫn bước trên những con đường cũ với ánh mắt không nhìn ai, với đôi vai gầy mang theo chiếc balo nặng trĩu và một thế giới đã khép kín từ lâu. Và phía sau, Chu Khánh Trì vẫn ở đó, giữ đúng lời hứa của mình một cách gần như tuyệt đối - không gọi, không chạm, không bước quá ranh giới vô hình mà em đã vạch ra. Hắn đi sau em, cách một khoảng không xa không gần, đủ để khi em dừng lại đột ngột, hắn cũng kịp dừng theo, đủ để khi em rẽ vào một con hẻm hẹp, hắn vẫn không mất dấu. Sự hiện diện của hắn dần trở thành một phần của thói quen, giống như cái lạnh cuối đông luôn bám lấy thành phố này - không dễ chịu, nhưng cũng không thể xua đi.
Có những lúc em tự hỏi, tại sao hắn vẫn còn ở đó. Không phải vì cần tiền, không phải vì mục đích rõ ràng nào, chỉ là… tồn tại, lặng lẽ và bền bỉ đến mức khó hiểu. Nhưng em không hỏi nữa. Không phải vì đã chấp nhận, mà vì nhận ra rằng có những thứ, dù hỏi cũng sẽ không có câu trả lời. Và có lẽ… em cũng không thật sự muốn nghe.
Đêm đó, tuyết không rơi, nhưng cái lạnh dường như sâu hơn. Con đường vắng lặng, ánh đèn đường thưa thớt hắt xuống những vệt sáng yếu ớt, không đủ để xua đi bóng tối mà chỉ khiến nó trở nên rõ ràng hơn. Em bước đi như mọi ngày, cảm nhận được bước chân phía sau vẫn đều đặn, không nhanh hơn, không chậm lại. Một nhịp điệu quen thuộc.
Cho đến khi –
Bước chân phía sau đột ngột thay đổi.
Nhanh hơn.
Gấp hơn.
Trước khi em kịp quay đầu lại, một lực mạnh đã kéo lấy cổ tay em, không thô bạo nhưng dứt khoát, kéo em lệch khỏi con đường quen thuộc, ép vào một con hẻm nhỏ khuất ánh sáng. Lưng em chạm vào bức tường lạnh, hơi thở khựng lại trong một nhịp ngắn, phản xạ đầu tiên là giật tay ra, nhưng bàn tay kia siết lại, không cho em cơ hội.
“—”
Em còn chưa kịp nói gì –
Một bóng người lao tới từ phía sau.
Tiếng bước chân nặng nề, loạng choạng, kéo theo mùi rượu nồng nặc xộc vào không khí.

“Đứng lại –!”
Giọng nói khàn đặc, méo mó vì men say.
Một gã đàn ông.
Mắt đỏ, bước chân không vững, nhưng lực lại rất mạnh. Lão không thèm nhìn em, chỉ nhắm thẳng vào Chu Khánh Trì, như thể đã xác định mục tiêu từ trước. Bàn tay thô ráp túm lấy cổ áo hắn, giật mạnh xuống, khiến cả hai ngã xuống nền xi măng lạnh cứng.
“Tiền đâu?!”
Câu hỏi gằn lên, không phải để hỏi, mà là để đe dọa.
Chu Khánh Trì không phản kháng.
Không chống cự.
Chỉ nằm đó, để mặc cho cú đấm đầu tiên giáng xuống, nặng và dứt khoát. Âm thanh va chạm vang lên khô khốc, khiến lồng ngực em chợt thắt lại. Cú thứ hai, thứ ba tiếp tục rơi xuống, dồn dập, không có khoảng nghỉ, như thể gã đàn ông kia đang trút hết cơn giận vô hình của mình lên cơ thể trước mặt.
Em đứng chết lặng trong góc tối.
Cơ thể căng cứng.
Không phải vì sợ.
Mà là vì… quá quen.
Cảnh tượng này.
Âm thanh này.
Nhịp điệu của bạo lực này.
Quá giống.
Giống đến mức khiến một phần trong em muốn bước ra ngay lập tức, muốn kéo hắn ra khỏi đó, muốn làm một điều gì đó –
Nhưng đúng lúc đó, Chu Khánh Trì ngẩng đầu.
Ánh mắt hắn chạm vào em.
Không nói.
Không ra lệnh.
Chỉ khẽ lắc đầu.
Rất nhẹ.
Nhưng đủ rõ.
Đừng!
Một cử chỉ đơn giản, nhưng lại mang theo một thứ gì đó nặng nề đến mức em không thể bước tiếp. Chân em như bị đóng chặt xuống nền đất, mọi ý nghĩ vừa dâng lên lập tức bị chặn lại, như thể hắn đang dùng chính ánh mắt đó để giữ em lại, để không kéo em vào vòng xoáy mà hắn đã quen từ rất lâu.
Em siết chặt tay.
Móng tay cắm vào da.
Nhưng không bước ra.
Gã đàn ông đánh thêm vài cú nữa, rồi như chán, lão lục lọi túi hắn, không tìm thấy gì, chửi một câu tục tĩu, rồi loạng choạng đứng dậy, bỏ đi, để lại phía sau chỉ là hơi rượu nồng nặc và một khoảng im lặng nặng nề.
Khi tiếng bước chân xa dần –
Em lao ra.
Không suy nghĩ.
Không do dự.
Quỳ xuống bên cạnh hắn, bàn tay run lên khi chạm vào vai hắn, cảm nhận được cơ thể vẫn còn ấm, vẫn còn phản ứng.
“Anh có sao không?”
Giọng em bật ra, nhanh hơn bình thường, thấp nhưng không còn đều.
Chu Khánh Trì nhắm mắt một giây, rồi mở ra, hơi thở còn nặng nhưng không đứt quãng như trước.
“Không sao.”
Hai chữ quen thuộc.
Nhẹ bẫng.
Như thể tất cả những gì vừa xảy ra… không đáng để nhắc tới.
“Không sao cái gì chứ…”
Em cắn nhẹ môi, giọng thấp xuống, có chút gì đó như bị ép lại.
“Tôi đưa anh đến trạm xá.”
Hắn lắc đầu.
“Không cần.”
Vẫn là sự từ chối quen thuộc, không giải thích, không thêm thắt.
Em siết tay hắn.
Lần này không nhẹ.
“Lắm lời.”
Hai chữ bật ra, không lớn, nhưng dứt khoát.
“Đi theo tôi. Nhanh.”
Không đợi hắn phản ứng, em đã kéo hắn dậy. Cơ thể hắn vẫn nặng, vẫn không ổn định, nhưng không phản kháng. Có lẽ vì không đủ sức. Hoặc có lẽ… vì không muốn.
Họ đi qua con hẻm, qua ánh đèn đường yếu ớt, đến trạm xá quen thuộc nơi ánh sáng trắng vẫn còn le lói trong đêm. Cánh cửa mở ra, hơi ấm tràn ra, kéo theo mùi thuốc sát trùng quen thuộc.
Y tá nhìn lên, rồi khựng lại.
“…Lại nữa à?”
Giọng cô không giấu nổi sự ngạc nhiên, xen lẫn một chút bất lực, như thể cảnh tượng này đã lặp lại quá nhiều lần đến mức không còn mới mẻ.
Em không trả lời.
Chỉ đỡ hắn ngồi xuống.
Mọi thứ sau đó diễn ra như một vòng lặp quen thuộc – băng bó, lau máu, kiểm tra vết thương. Chu Khánh Trì không kêu, không nhăn mặt, chỉ ngồi đó, ánh mắt không rõ đang nhìn gì, như thể cơ thể này không hoàn toàn thuộc về hắn nữa.
Khi y tá rời đi, căn phòng nhỏ chỉ còn lại hai người.
Im lặng.
Nhưng không phải kiểu im lặng trống rỗng.
Mà là một sự im lặng đầy ắp những thứ không cần nói ra.
Em đứng đó, nhìn hắn.
Nhìn những vết thương mới chồng lên những vết cũ.
Nhìn cách hắn tồn tại như thể tất cả những điều này… là bình thường.
Và trong khoảnh khắc đó, em chợt nhận ra –
Họ giống nhau.
Không phải ở hoàn cảnh.
Mà ở cách chịu đựng.
Cách im lặng.
Cách để mọi thứ đi qua mình mà không phản kháng.
Một sự đồng cảm rất nhỏ, rất mơ hồ, len vào giữa khoảng cách vốn tưởng đã cố định từ trước.
Rất lâu sau, em mới lên tiếng.
“…Sau này đừng đi sau lưng tôi nữa.”
Giọng em không lớn.
Không lạnh.
Chỉ… rất bình thường.
Chu Khánh Trì ngẩng lên.
Ánh mắt hắn dừng lại trên em, có chút gì đó khó hiểu, như thể không chắc mình đã nghe đúng.
Em nhìn thẳng vào hắn.
Không né tránh.
“…Đi bên cạnh.”
Ba chữ.
Nhẹ.
Nhưng rõ ràng.
Không phải mệnh lệnh.
Không phải yêu cầu.
Mà giống như… một sự cho phép.
Một ranh giới mới.
Được vạch ra.
Không còn phía sau.
Mà là… bên cạnh.`,
    11: `CHƯƠNG 11: HAI NĂM

Thời gian không còn được tính bằng ngày tháng rõ ràng nữa, mà trôi đi như những lớp bụi mỏng tích tụ dần trên những góc tường cũ kỹ - không ai để ý, nhưng đến khi ngoảnh lại thì đã phủ kín từ lúc nào.
Hai năm, nói ra thì dài, nhưng khi sống trong đó, mỗi ngày lại giống như một bản sao mờ nhạt của ngày hôm trước, lặp lại, kéo dài, không có điểm nhấn, không có kết thúc rõ ràng.
Thành phố vẫn vậy, mùa đông qua rồi lại đến, cái lạnh không còn cắt da như trước nhưng vẫn đủ để len vào từng kẽ áo, từng hơi thở. Con đường em đi mỗi ngày vẫn là con đường đó, những bức tường loang lổ, những bóng đèn vàng vọt, những góc hẻm tối nơi người ta không muốn nhìn lâu. Chỉ có một thứ thay đổi - không còn là một mình em bước đi trong khoảng trống nữa.
Chu Khánh Trì đi bên cạnh em.
Không phải lúc nào cũng sát vai, không phải lúc nào cũng nói chuyện, nhưng khoảng cách giữa hai người đã không còn là một ranh giới lạnh lẽo như trước. Có những lúc họ đi song song mà không ai lên tiếng, chỉ nghe tiếng bước chân hòa vào nhau, đều đặn, trầm thấp, như một nhịp đập chung mà không cần xác nhận. Cũng có những lúc, hắn đi chậm hơn nửa bước, như một thói quen không bỏ được, như thể vẫn chưa hoàn toàn tin rằng mình được phép đứng ngang hàng.
Đêm xuống, khu phố vẫn đầy những góc tối và những ánh mắt không thiện ý. Có những gã đàn ông say rượu lảo đảo, có những nhóm thanh niên tụ tập với tiếng cười khàn đặc và ánh nhìn dò xét. Nhưng mỗi khi những ánh mắt đó dừng lại trên em quá lâu, mỗi khi có bước chân nào đó tiến lại gần hơn mức cần thiết, Chu Khánh Trì sẽ bước lên trước một chút, không nói gì, chỉ đứng đó, ánh mắt lạnh và tĩnh đến mức khiến người ta chùn bước. Không cần đánh nhau, không cần đe dọa - chỉ cần sự hiện diện của hắn là đủ để những thứ nguy hiểm kia tự rút lui, như thể chúng cũng nhận ra rằng có những người không nên chạm vào.
Em không nói cảm ơn.
Hắn cũng không chờ đợi.
Mọi thứ diễn ra như một thói quen.
Như một điều hiển nhiên.
Có những ngày, em không có tiền ăn trưa. Không phải vì quên, mà vì không có. Em vẫn ngồi ở góc sân trường quen thuộc, lưng dựa vào tường, mắt nhìn xuống nền đất, như thể đó chỉ là một buổi trưa bình thường. Chu Khánh Trì sẽ xuất hiện, không gọi tên, không hỏi han, chỉ đặt xuống bên cạnh em một mẩu bánh mì còn ấm, hoặc đôi khi là một hộp sữa nhỏ.
“Ăn đi.”
Giọng hắn thấp, ngắn gọn.
Em liếc nhìn.
“Anh lấy đâu ra?”
“Có.”
Một câu trả lời không có thông tin.
Nhưng em không hỏi thêm.
Chỉ cầm lấy.
Cắn một miếng.
Không nói cảm ơn.
Hắn cũng không nhắc.
Chỉ ngồi xuống bên cạnh, dựa lưng vào tường, ánh mắt nhìn về phía xa, như thể đang canh chừng thứ gì đó mà chỉ mình hắn nhìn thấy.
Có những ngày, em trở về với những vết bầm mới - không phải từ mẹ, mà từ trường, từ những góc khuất mà không ai nhìn thấy hoặc không ai muốn nhìn thấy. Áo bị xé một góc, tóc bị cắt nham nhở, da thịt in dấu những vết đỏ tím chưa kịp tan. 
Em không nói. 
Cũng không giải thích.
Chỉ ngồi xuống một góc quen thuộc dưới chân cầu thang khu chung cư, nơi ánh đèn yếu ớt không đủ soi rõ mọi thứ.
Chu Khánh Trì ngồi xuống trước mặt em.
Không hỏi “ai làm”.
Không hỏi “tại sao”.
Chỉ lấy từ trong túi ra một cuộn băng gạc cũ, một chai thuốc sát trùng nhỏ.
“Đưa tay đây.”
Em không động.
Chỉ nhìn hắn.
Ánh mắt không phản kháng, nhưng cũng không hợp tác.
“Không đau.”
Hắn nói.
Không phải để trấn an.
Chỉ là một câu thông báo.
Em im lặng một lúc, rồi đưa tay ra.
Hắn cúi đầu, lau vết thương, động tác không quá nhẹ, nhưng cũng không thô, chỉ đủ để làm sạch. Những lúc thuốc chạm vào da, cảm giác rát lan ra, nhưng em không rút tay lại. Không phải vì không đau, mà vì… đã quen với cảm giác đó rồi.
“Anh đánh lại đi.”
Em đột nhiên nói, giọng nhỏ, gần như lẫn vào không khí.
Chu Khánh Trì dừng tay một giây.
“Đánh ai?”
“Bọn nó.” - Em đáp, mắt vẫn nhìn xuống - “Không phải anh làm được sao?”
Hắn tiếp tục băng vết thương, không ngẩng đầu.
“Được.”
Một chữ.
Rồi im lặng.
Em chờ.
Một giây.
Hai giây.
“…Sao không làm?”
Chu Khánh Trì buộc nút băng lại, chậm rãi.
“Vì em vẫn sẽ bị đánh.”
Câu trả lời đơn giản.
Không có lý luận.
Không có an ủi.
Nhưng lại chính xác đến mức không thể phản bác.
Em không nói nữa.
Chỉ ngồi đó.
Nhìn xuống bàn tay đã được băng lại.
Trong lòng có thứ gì đó khẽ động, rất nhẹ, như một gợn sóng nhỏ trên mặt nước đã đóng băng từ lâu.
Giữa họ, chưa từng có từ “yêu”.
Không ai nói.
Không ai hỏi.
Không ai xác nhận.
Nhưng mỗi ngày trôi qua, mỗi bước chân đi cùng nhau, mỗi lần im lặng ngồi cạnh nhau trong những góc tối, mỗi mẩu bánh mì được chia sẻ, mỗi vết thương được băng bó - tất cả đều tích tụ lại, chậm rãi, âm thầm, tạo thành một thứ gì đó không tên.
Không ồn ào.
Không rực rỡ.
Nhưng sâu.
Rất sâu.
Đến mức khi nhận ra –
Thì đã không thể tách rời.
Hai con người.
Hai khoảng trống.
Dần dần lấp đầy nhau.
Không hoàn toàn.
Nhưng đủ để… tiếp tục tồn tại.`,
    12: `CHƯƠNG 12: ĐÊM ĐỊNH MỆNH

Đêm xuân năm đó không mang theo hơi ấm như người ta vẫn nói. Không có hoa nở, không có gió dịu, chỉ có một thứ không khí ẩm lạnh bám dính lấy từng bức tường, từng hơi thở, khiến mọi thứ trở nên nặng nề và khó chịu một cách khó hiểu.
Ngoài cửa sổ, những giọt nước đọng lại từ chiều rơi tí tách xuống mái tôn, đều đặn như một thứ âm thanh vô nghĩa kéo dài mãi không dứt. Căn nhà vẫn vậy - chật hẹp, cũ kỹ, mùi ẩm mốc trộn lẫn với mùi phấn và nước hoa rẻ tiền, nhưng đêm nay, trong không gian đó còn có thêm một thứ gì đó khác… một sự căng thẳng âm ỉ, như thể chính những bức tường cũng đang biết trước điều gì sắp xảy ra.

Em đứng trong phòng, tay vẫn còn cầm chiếc khăn ướt, ánh mắt dừng lại trên cánh cửa khép hờ. Bên ngoài, giọng mẹ em vang lên, nhỏ hơn mọi khi, không còn the thé, không còn chua chát, mà mềm đi một cách bất thường, kéo dài từng chữ như thể đang nịnh nọt.
“Anh yên tâm… con bé ngoan lắm… chưa từng qua tay ai đâu…”
Câu nói ấy rơi vào tai em, không lớn, nhưng đủ rõ để khiến toàn bộ cơ thể em cứng lại. Chiếc khăn trong tay rơi xuống đất lúc nào không hay, nước thấm ra nền nhà lạnh lẽo, lan thành một vệt tối sẫm. Trong đầu em không có suy nghĩ rõ ràng, chỉ là một khoảng trống đột ngột bị xé toạc, để lộ ra thứ gì đó rất sâu, rất lạnh, và rất thật.
“Bao nhiêu đây đủ chưa?” – Giọng đàn ông vang lên, khàn và trầm, mang theo mùi thuốc lá và thứ gì đó thô ráp, khiến người ta chỉ nghe thôi cũng thấy khó chịu.
“Mấy bữa nữa em trả thêm… anh cứ -”
“Không cần.” Gã cắt ngang, giọng cười khẽ. “Tôi thích trả một lần cho xong.”
Một khoảng im lặng ngắn.
Rồi –
Tiếng bước chân.
Tiến lại gần.
Dừng trước cửa phòng em.
Cánh cửa bị đẩy ra.
Không nhẹ.
Không mạnh.
Chỉ… dứt khoát.
Em đứng đó, không lùi.
Cũng không tiến.

Ánh mắt nhìn thẳng vào người đàn ông trước mặt – một gã to lớn, vai rộng, ánh mắt đục ngầu, quét qua người em như đang đánh giá một món hàng. Mẹ em đứng phía sau, tay siết chặt túi xách, ánh mắt không nhìn em, mà nhìn xuống sàn nhà, như thể nếu không nhìn thì mọi chuyện sẽ không tồn tại.
“Đi đi.” Bà nói, giọng thấp, nhanh, gần như không mang cảm xúc. “Đừng có làm rắc rối.”
Nói xong, bà không chờ phản ứng, chỉ cúi đầu nhét vội xấp tiền vào túi, tay run lên rất khẽ nhưng vẫn cố giữ vẻ bình thản, rồi quay người bước ra ngoài. Cánh cửa mở ra, một luồng gió lạnh lùa vào, thổi bay mùi nước hoa còn vương lại trong không khí, và trước khi em kịp nói thêm điều gì, cánh cửa đã đóng sầm lại.
“Rầm.” – Âm thanh khô khốc vang lên, dội vào bốn bức tường chật hẹp, như một dấu chấm hết lạnh lùng. Bà đi rồi. Không ngoảnh đầu. Không do dự. Không để lại bất cứ thứ gì ngoài khoảng trống nặng nề và sự im lặng đến nghẹt thở.
Em đứng đó, không cử động.
Không phải vì không hiểu, mà là vì… không thể tin.
Mọi thứ diễn ra quá nhanh, quá dứt khoát, như thể một phần nào đó trong em vẫn đang chờ bà quay lại, chờ một lời giải thích, chờ một câu nói rằng tất cả chỉ là nhầm lẫn.
Nhưng… không có gì cả.
Chỉ có cánh cửa đóng kín và tiếng bước chân xa dần ngoài hành lang.
 “…Mẹ?” Giọng em khẽ bật ra, rất nhỏ, như thể chính em cũng không chắc mình vừa nói gì.
Người đàn ông bước vào sâu hơn trong phòng. Cánh cửa phía sau lưng hắn khép lại, lần này không cần ai chạm vào, như thể căn nhà này đã quen với việc tự nhốt những thứ bên trong nó. 
“Đừng gọi nữa.” – Hắn cười, giọng khàn đặc, kéo dài từng chữ – “Gọi cũng không giải quyết được gì.”
Một câu nói.
Cắt đứt hoàn toàn.
Trong khoảnh khắc đó, có thứ gì đó trong em vỡ ra – không phải ồn ào, không phải dữ dội, mà rất lặng, rất sâu, như một tảng băng lớn nứt toác từ bên trong.
Gã đàn ông tiến lại gần.
Mỗi bước chân nặng nề.
Chậm.
Chắc.
“Đừng sợ.” – Hắn cười, giọng khàn đặc – “Chú sẽ nhẹ nhàng.”
Bàn tay hắn đưa ra.
Chạm vào cổ tay em.
Cái chạm đầu tiên khiến toàn bộ cơ thể em co lại theo bản năng, như bị điện giật. Hơi thở nghẹn lại trong cổ họng, tim đập dồn dập đến mức đau nhói. Không phải vì đau thể xác – mà là vì một thứ gì đó sâu hơn, nguyên thủy hơn, đang gào thét trong từng tế bào.
Chạy.
Một từ duy nhất bật lên trong đầu.
Nhưng chân không nhúc nhích.
Cơ thể như bị đóng đinh tại chỗ.
“Đừng làm khó nhau.” – Hắn siết chặt hơn, giọng thấp xuống – “Mẹ mày đã nhận tiền rồi.”
	Tiền.
Một từ quá quen.
Nhưng chưa bao giờ… đáng sợ đến vậy.
Em nhìn hắn.
Và chính trong khoảnh khắc đó - một thứ gì đó sâu trong cơ thể em đột ngột bùng lên, không phải suy nghĩ, không phải lý trí, mà là bản năng. Thô ráp. Nguyên thủy. Tàn nhẫn.
Không còn do dự.
Không còn đường lùi.
Chỉ có… phản kháng.
Em giật mạnh tay ra, lực bất ngờ khiến hắn khựng lại nửa nhịp. Không chờ thêm, em quay người, gần như vấp vào chính mình khi lao về phía góc tường, nơi cây gậy sắt dựng đó từ bao giờ - một vật vô tri, lạnh lẽo, nhưng trong khoảnh khắc này lại trở thành thứ duy nhất em có thể nắm lấy.
Ngón tay siết chặt.
Kim loại lạnh buốt ăn sâu vào da.
“Đứng yên!”
Giọng em bật ra, không lớn, nhưng sắc đến mức chính em cũng giật mình. Nó run. Nhưng không lùi.
Gã đàn ông khựng lại một giây.
Ánh mắt hắn thoáng qua một tia ngạc nhiên.
Rồi bật cười.
“Con bé này –”
Hắn chưa kịp nói hết.
Cây gậy vung xuống.
Một cú.
Nặng.
Dứt khoát.
Âm thanh va chạm vang lên khô khốc, cứng và lạnh, như thứ gì đó bị đập vỡ bên trong không gian chật hẹp. Hắn đổ sập xuống nền nhà, cơ thể mất thăng bằng, chưa kịp phản ứng thì cú thứ hai đã giáng xuống.
Lần này… mạnh hơn.
Không còn giữ lại.
Không còn kiểm soát.
Cú thứ ba.
Tất cả lực.
Tất cả sợ hãi.
Tất cả những thứ bị dồn nén suốt bao lâu –
Đổ dồn vào đó.
Rồi… dừng lại.
Không có cú thứ tư.
Không có tiếp diễn.
Chỉ có sự im lặng.
Đột ngột.
Nặng nề.
Như thể cả căn phòng vừa bị ai đó bóp nghẹt.
Máu bắt đầu lan ra.
Đỏ.
Đậm.
Loang dần trên nền nhà lạnh.
Em đứng đó.
Hai tay vẫn nắm chặt cây gậy.
Hơi thở dồn dập, đứt quãng, lồng ngực phập phồng như không đủ không khí để hít vào. Mắt mở lớn, không chớp, nhìn xuống thân thể bất động trước mặt, nhưng lại như không thật sự nhìn thấy gì.
Trong đầu không còn âm thanh.
Không còn tiếng chửi rủa.
Không còn tiếng cười nhạo.
Không còn gì cả.
Chỉ có… một khoảng trống trắng xóa.
Cây gậy tuột khỏi tay.
“Cạch.”
Âm thanh nhỏ, nhưng vang lên rõ ràng đến đáng sợ.
Ngón tay em run lên.
Rồi co lại.
Rồi buông ra.
Em lùi một bước.
Rồi thêm một bước.
Ánh mắt lướt qua vũng máu đang lan đến mũi giày.
Không có sợ hãi.
Không có hối hận.
Chỉ có… trống rỗng.
Một khoảng trống sâu hoắm, nuốt chửng mọi thứ.

“….”

Môi em khẽ động.
Nhưng không có âm thanh nào phát ra.
Rồi đột ngột –
Em quay người.
Mở cửa.
Chạy.
Không nhìn lại.
Không suy nghĩ.
Chỉ chạy.
Ra khỏi căn nhà.
Ra khỏi hành lang chật hẹp.
Tiếng bước chân dội vào tường, vang lên gấp gáp, hỗn loạn. Bóng đèn trên trần chớp tắt liên hồi, ánh sáng vàng vọt vỡ vụn trên sàn nhà ẩm ướt. Bên ngoài, bầu trời không còn yên tĩnh – mây đen cuộn lại, nặng trĩu, và rồi –
“Ầm –!”
Một tiếng sấm xé toạc không gian.
Ánh chớp lóe lên.
Trắng xóa.
Trong khoảnh khắc đó, thân ảnh em hiện rõ nơi hành lang—gầy gò, run rẩy, quần áo vấy máu, đôi mắt trống rỗng như không còn gì bên trong.
Rồi biến mất.
Chỉ còn lại tiếng bước chân xa dần.
Trong bóng tối của hành lang, có một người đã đứng đó từ trước.
Chu Khánh Trì.
Hắn không gọi.
Không bước tới.
Chỉ đứng im, lưng dựa vào bức tường lạnh, ánh mắt dõi theo hướng em vừa chạy đi. Hắn đã nghe thấy – từng âm thanh va chạm, từng tiếng thở dồn dập, từng khoảng lặng đáng sợ giữa những cú đánh. Hắn không cần nhìn thấy toàn bộ… cũng đủ hiểu.
Nhưng rồi –
Hắn vẫn nhìn thấy.
Khoảnh khắc em lao ra.
Toàn thân máu.
Ánh mắt trống rỗng.
Không còn là cô gái đi trước hắn mỗi ngày.
Mà là một thứ gì đó… vừa bị phá vỡ hoàn toàn.
Bàn tay hắn siết lại.
Nhưng không đuổi theo.
Chỉ đứng đó.
Đợi.
Đến khi bóng em hoàn toàn khuất khỏi hành lang, khoảng không trước mắt hắn trở nên trống rỗng đến mức khiến người ta có cảm giác như mọi thứ vừa bị rút sạch chỉ trong một nhịp thở.
Chu Khánh Trì vẫn đứng yên tại chỗ, không đuổi theo, không gọi lại, chỉ lặng lẽ nhìn về hướng em biến mất, ánh mắt sâu và tĩnh, như thể đang cố giữ lại một thứ gì đó vừa trượt khỏi tầm tay.
Hắn không động đậy trong một lúc rất lâu, lâu đến mức tiếng sấm ngoài trời dường như cũng lùi lại phía sau, chỉ còn lại nhịp thở của chính hắn vang lên rất khẽ trong lồng ngực.
Trong đầu không có suy nghĩ rõ ràng, chỉ là một khoảng trống nặng nề.
Rồi, từ phía sau cánh cửa kia, một âm thanh lọt ra.
Rất khẽ.
Đứt quãng.
Một tiếng rên.
Không rõ ràng, nhưng đủ để nhận ra đó là sự đau đớn – thứ đau đớn còn sót lại sau khi tất cả đã kết thúc, yếu ớt như một hơi thở tàn lụi chưa kịp tắt hẳn.
Chu Khánh Trì khẽ động.
Chỉ một chút.
Ánh mắt hắn chuyển đi, không còn dừng lại ở hành lang trống nữa.
Hắn đứng thêm một giây.
Như suy nghĩ.
Như cân nhắc.
Rồi mới rời khỏi chỗ.
Bước chân hắn nặng, không nhanh, không chậm, nhưng mỗi bước đi đều có cảm giác như dẫm lên một thứ gì đó vô hình, kéo xuống, ghì lại, khiến chuyển động trở nên chậm hơn bình thường. Hắn tiến về phía cánh cửa, nơi ánh đèn vàng yếu ớt đang rỉ ra qua khe hở, vệt sáng mỏng kéo dài trên nền hành lang như một vết cắt không lành.
Hắn dừng lại trước cửa.
Khoảng cách chỉ còn một bước.
Nhưng hắn không bước tiếp.
Không phải vì do dự.
Mà là vì… ngay khoảnh khắc đó, hắn đã biết rõ phía sau cánh cửa là gì.
Bàn tay hắn nâng lên.
Dừng lại giữa không trung.
Rồi chạm vào cánh cửa.
Đẩy.
“Két –”
Âm thanh vang lên chậm và dài, như một thứ gì đó bị kéo ra khỏi sự im lặng, rợn người đến mức khiến không gian xung quanh cũng như co lại.
Cánh cửa mở ra.
Và ngay khi ánh nhìn chạm vào bên trong –
Chu Khánh Trì sững lại.
Không phải lùi.
Không phải tiến.
Mà là đứng chết lặng tại chỗ, toàn bộ cơ thể cứng đờ như bị đóng băng trong chính khoảnh khắc đó.
Mùi máu ập ra.
Nồng.
Đặc.
Quện chặt vào không khí đến mức gần như có thể nhìn thấy.
Nó phủ lên nền nhà, bám lên tường, lan ra từ thân thể nằm đó – một thân thể vẫn còn dấu hiệu tồn tại, nhưng yếu ớt đến mức gần như không còn ý nghĩa.
Tiếng rên ban nãy… giờ chỉ còn là một âm thanh rất xa, rất mỏng, như thể bất cứ lúc nào cũng có thể biến mất.
Căn phòng không có thêm một tiếng động nào khác.
Chỉ có khoảng lặng.
Nặng.
Đè xuống.
Chu Khánh Trì đứng ở ngưỡng cửa.
Không bước vào.
Chỉ nhìn.
Ánh mắt hắn hạ thấp dần, sâu xuống, tối lại, không dao động, không hoảng loạn, cũng không có lấy một tia sợ hãi. Tất cả những phản ứng lẽ ra phải có dường như đều bị giữ lại ở đâu đó rất xa, không chạm đến được bề mặt.
Và trong đáy mắt ấy –
Có một thứ dần dần hiện lên.
Không phải cảm xúc.
Mà là –
Quyết định.`,
    13: `CHƯƠNG 13: CÁI ÔM VĨNH BIỆT

Con hẻm tối như nuốt chửng mọi thứ, ánh đèn đường ngoài đầu hẻm chỉ kịp len vào một đoạn rất ngắn rồi bị bóng đêm dày đặc chặn lại, để lại phía trong một khoảng không đặc quánh, ẩm lạnh và tĩnh đến mức nghe rõ từng nhịp tim hỗn loạn trong lồng ngực.
Em ngồi co mình sát góc tường, đầu gối kéo lên, hai tay ôm chặt lấy thân thể như thể nếu buông ra, chính mình cũng sẽ vỡ vụn theo. Máu trên người đã bắt đầu khô lại, bết dính, từng mảng sẫm màu bám vào da thịt khiến em vừa lạnh vừa nặng, mỗi cử động nhỏ cũng kéo theo cảm giác rít buốt. Nhưng cái lạnh đó không đáng sợ bằng thứ đang lan ra từ bên trong - một khoảng trống rỗng khổng lồ, nơi cảm xúc không còn là đau đớn hay sợ hãi rõ ràng nữa, mà là một sự hỗn loạn không hình dạng, khiến em không biết mình đang tồn tại hay chỉ đang rơi xuống.
Em không nghĩ được.
Không biết phải làm gì tiếp theo.
Không biết… mình vừa trở thành cái gì.
Trong đầu chỉ lặp lại một khoảnh khắc - cây gậy rơi xuống, âm thanh khô khốc, máu bắn ra - rồi lại bị cắt ngang bởi một khoảng trắng trống rỗng, như thể ký ức cũng đang từ chối chạm vào điều đó.
Rồi – Tiếng bước chân vang lên.
Không lớn.
Nhưng đủ để xuyên qua mọi lớp hỗn loạn trong em.
Cơ thể em phản ứng trước cả suy nghĩ – vai co lại, lưng dán chặt hơn vào tường, tay siết mạnh đến mức móng cắm vào da. Ánh mắt em bật lên, hoảng loạn, tìm kiếm trong bóng tối.
Một bóng người.
Đang tiến lại gần.
Nhịp tim đập dồn.
Hơi thở nghẹn lại.
Em muốn chạy.
Nhưng chân không cử động.
Cho đến khi bóng người đó bước vào vùng sáng yếu ớt –
Và em nhận ra.
“…Khánh Trì…”
Tên hắn bật ra, run rẩy, vỡ vụn, như thể phải đi qua một lớp gì đó rất dày mới thoát được ra ngoài.
“Em… em…”
Cổ họng em nghẹn lại. Những gì muốn nói đều bị mắc kẹt, không thành lời, chỉ còn lại sự rối loạn hiện rõ trong ánh mắt.
Chu Khánh Trì dừng trước mặt em.
Ánh mắt hắn rơi xuống người em.
Không vội.
Không giật mình.
Chỉ là nhìn.
Nhìn rất kỹ.
Như thể muốn ghi nhận từng chi tiết – vết máu, bàn tay run, đôi mắt mất tiêu cự - tất cả đều được hắn thu vào, lặng lẽ, không phản ứng ra ngoài. Nhưng chính sự bình tĩnh đó… lại khiến khoảng cách giữa hai người trở nên nặng nề đến nghẹt thở.
Rồi hắn giơ tay.
Ngón trỏ đặt lên môi.
“Suỵt.”
Một âm thanh rất nhỏ.
Nhưng lại giống như một mệnh lệnh.
Mọi thứ trong em chững lại một nhịp.
Không phải vì em hiểu.
Mà là vì… em không còn đủ sức để chống lại bất cứ điều gì nữa.
Bàn tay hắn nắm lấy cổ tay em.
Chắc.
Ấm.
Không run.
“Đi.”
Chỉ một chữ.
Ngắn.
Không giải thích.
Nhưng lại mang theo một sự dứt khoát khiến em không thể từ chối.
Em đứng dậy.
Đôi chân không vững.
Nhưng vẫn bước theo.
Không phải vì tin tưởng.
Mà là vì… không còn lựa chọn nào khác.
Hắn dẫn em đi qua những con hẻm ngoằn ngoèo, tránh ánh sáng, tránh những nơi có người qua lại. Mỗi lần rẽ, mỗi lần dừng, đều không có chút chần chừ nào, như thể mọi thứ đã được tính trước trong đầu hắn. Em đi phía sau, bị kéo đi, đầu óc vẫn mơ hồ, nhưng dần dần, một điều gì đó bắt đầu len vào - một cảm giác kỳ lạ, không rõ ràng, như thể… có người đang thay em gánh lấy phần còn lại của thế giới.
Khi dừng lại trước nhà vệ sinh công cộng cũ kỹ, em vẫn chưa hoàn toàn tỉnh táo.
Hắn mở cửa.
Đẩy em vào.
Không gian bên trong chật hẹp, ánh đèn trắng lạnh lẽo chiếu xuống, làm mọi thứ trở nên trần trụi hơn, kể cả chính em.
Hắn đưa túi giấy cho em.
“Thay ra.”
Giọng hắn thấp.
Ổn định.
“Nh… nhưng…”
“Thay đi.” - Hắn cắt ngang, ánh mắt không đổi - “Nhanh!”
Không có lựa chọn.
Em gật đầu rất khẽ.
Bước vào.
Cánh cửa khép lại.
Chu Khánh Trì đứng bên ngoài.
Lưng dựa vào tường.
Mắt nhìn thẳng phía trước.
Không động.
Không suy nghĩ.
Ít nhất… là bề ngoài.
Nhưng sâu bên trong, mọi thứ đang lắng xuống theo một cách rất khác. Không phải hỗn loạn, không phải sợ hãi – mà là một sự sắp xếp, lạnh lẽo và rõ ràng. Từng chi tiết, từng khả năng, từng bước tiếp theo… đều hiện ra, nối lại với nhau, tạo thành một con đường duy nhất.
Hắn đã quyết định.
Từ trước khi em kịp hiểu chuyện gì đang xảy ra.
Khi em bước ra, đã thay quần áo, gương mặt vẫn tái nhợt nhưng ánh mắt dần có lại chút ý thức, hắn chỉ nhìn một cái rồi đưa tay nhận túi giấy.
Mở ra.
Nhìn.
Rồi gấp lại cẩn thận.
“Đừng nghĩ đến nữa.” - Hắn nói, giọng thấp, gần như thì thầm, nhưng rõ ràng đến mức không thể bỏ qua - “Em đi đâu đó đi.”
Em đứng im.
Câu nói đó không đi qua tai.
Mà đập thẳng vào lồng ngực.
“…Đi đâu chứ?” – Giọng em khàn đặc, gần như bật ra từ nơi sâu nhất trong lồng ngực – “…Em vừa gây tội….” – Em nói, rất khẽ, như thể nếu nói lớn hơn một chút, sự thật đó sẽ trở nên không thể chịu nổi.
Chu Khánh Trì nhìn em.
Rất lâu.
Rồi lắc đầu.
“Em gây tội gì chứ?”
Một câu nói.
Bình thản.
Nhưng tuyệt đối.
“Đi đi.” – Hắn lặp lại, lần này giọng thấp hơn, nặng hơn – “Nhẹ nhàng thôi. Đi đi. Ngay bây giờ. Nhanh!”
Em không hiểu.
Không thể hiểu.
Nhưng ánh mắt hắn… không cho phép em ở lại.
Và rồi – 
Em quay đi.
Bước chân chậm.
Rời khỏi nơi đó.
Như một kẻ đang đi theo mệnh lệnh hơn là lựa chọn.

“{{user}}.”

Giọng hắn vang lên từ phía sau.
Em khựng lại.
Nhưng không quay đầu.
Vì em sợ.
Sợ nếu quay lại… sẽ không đi nổi nữa.
Và ngay khoảnh khắc đó –
Một lực kéo nhẹ.
Rồi vòng tay siết lại.
Chu Khánh Trì ôm em từ phía sau.
Không vội.
Không mạnh.
Nhưng đủ để giữ lại.
Chu Khánh Trì vòng tay qua vai em, kéo em vào lòng, cằm khẽ chạm lên đỉnh đầu em. Hơi ấm của hắn không rõ ràng, nhưng lại thật đến mức khiến em bất giác run lên. Đây không phải cái ôm vội vã, không phải cái ôm an ủi – mà là một cái ôm rất chậm, rất sâu, như thể hắn đang cố ghi nhớ cảm giác này lần cuối.
Em cứng người.
Không giãy.
Không phản ứng.
Chỉ đứng đó.
Cảm nhận.
Lần đầu tiên – sau tất cả - em cảm nhận được một thứ không phải là đau đớn.
Hơi ấm.
Rất mỏng.
Nhưng thật.

Hơi thở hắn khẽ chạm xuống.
Rồi một cái hôn.
Nhẹ đến mức gần như không tồn tại.
Nhưng lại khiến tim em thắt lại.

“Đừng quay lại.”

Giọng hắn rất thấp.
Như một lời cầu xin.
Nhưng cũng như một mệnh lệnh.

Em không đáp.
Không thể đáp.
Chỉ cảm thấy lồng ngực mình đau đến mức gần như vỡ ra, một cơn đau không rõ nguyên nhân, không liên quan đến những gì vừa xảy ra, mà đến từ chính khoảnh khắc này – khi em nhận ra… mình đang mất đi một thứ gì đó, mà ngay cả tên gọi cũng không biết.
Hắn buông tay.
Chậm.
Như không muốn buông.
Nhưng buộc phải buông.
Em bước đi.
Không quay đầu.
Không dừng lại.
Nhưng mỗi bước… đều nặng hơn.
Như có thứ gì đó kéo ngược lại phía sau.
Chu Khánh Trì đứng đó.
Nhìn theo.
Cho đến khi bóng em biến mất hoàn toàn.
Hắn không gọi nữa.
Không bước theo.
Chỉ đứng.
Rất lâu.
Rồi khẽ cười.
Một nụ cười gần như không có hình dạng.

“{{user}}…”

Giọng hắn tan vào không khí.

“…anh yêu em.”

Lần đầu tiên.
Và cũng là lần cuối cùng.
Hắn nói ra.
Không ai nghe thấy.
Không ai đáp lại.
Chỉ có bóng tối – 
Giữ lấy lời đó.
Ở lại.`,
    '14.1': `CHƯƠNG 14.1: GÁNH TỘI THAY (1)

Đêm vẫn chưa tan hẳn, nhưng cái lạnh đã rút sâu vào từng kẽ tường, từng bậc cầu thang, từng góc tối của khu chung cư cũ kỹ như thể nó chưa từng rời đi.

Chu Khánh Trì đứng trước cánh cửa quen thuộc, nơi vừa cách đó không lâu vẫn còn ánh đèn vàng rỉ ra yếu ớt, giờ đây lại im lìm như một căn nhà bị bỏ hoang. Hắn không gõ cửa, chỉ đưa tay đẩy nhẹ. Cánh cửa mở ra, không khóa. Bên trong vẫn còn nguyên mùi máu, nồng đến mức khiến không khí trở nên đặc quánh, như thể mỗi lần hít thở đều phải đi qua một lớp gì đó dày và tanh.

Hắn bước vào, ánh mắt lướt qua căn phòng, dừng lại ở vũng máu đã bắt đầu sẫm lại, lan ra như một cái bóng không có hình dạng. Người đàn ông kia vẫn nằm đó, không còn động đậy, chỉ còn lại dấu vết của sự tồn tại qua những vệt máu đã khô. Chu Khánh Trì không nhìn lâu, như thể hắn đã chấp nhận cảnh tượng này ngay từ khi còn đứng ngoài hành lang. Hắn cúi xuống, nhặt cây gậy sắt vẫn còn nằm đó, trên bề mặt lạnh lẽo vẫn còn dính những dấu tay mờ nhòe.

Hắn lấy tay áo, lau kỹ từng chút một. Khi bề mặt kim loại trở nên sạch hơn, hắn dừng lại một giây, nhìn xuống lòng bàn tay mình – những vết xước nhỏ, những vết bẩn chưa kịp rửa sạch rồi không chần chừ, hắn siết chặt cây gậy. Ấn một lần, rồi thêm một lần nữa. Dấu vân tay in xuống, rõ ràng, dứt khoát, không hề run rẩy.

Hắn đặt cây gậy xuống, đứng thẳng dậy, nhìn quanh hiện trường lần cuối. Không có lưu luyến, không có do dự, chỉ có một sự bình tĩnh đến lạnh lẽo, như thể tất cả những gì hắn vừa làm… vốn dĩ đã được quyết định từ khoảnh khắc hắn nhìn thấy em rời đi trong bóng tối.

Khi hắn rời khỏi căn nhà, trời bắt đầu rạng. Một vệt sáng xám nhạt kéo dài nơi chân trời, không đủ để gọi là bình minh, chỉ là dấu hiệu cho thấy một ngày mới đang đến – một ngày không có gì khác biệt, ngoại trừ việc một người sẽ bước vào bóng tối thay cho người khác.

Chu Khánh Trì đi thẳng đến đồn cảnh sát, hắn bước vào trong với tư thế đã sẵn sàng.

“Tôi tự thú.”

Chỉ ba chữ ngắn nhưng đủ để khép lại mọi con đường phía sau.

***
Khoảng năm giờ sáng – Thành phố vẫn còn mờ sương.

Em đứng trước cổng chung cư, hơi thở còn chưa đều, tim vẫn còn đập nhanh sau một đêm chạy trốn vô định. Nhưng khi nhìn thấy – dải băng phong tỏa, ánh đèn nhấp nháy, những bóng người mặc đồng phục đứng dày đặc – cả cơ thể em như bị kéo căng ra.

Không cần ai nói, em cũng hiểu. Mọi thứ… đã không còn đường lui. Bước chân em chậm lại, nhưng vẫn tiến tớ, như bị kéo đi. Bên trong, người ta đang khiêng ba em – Đàm Nhật Tân – ra ngoài. Ông nằm trên băng ca, khuôn mặt tái nhợt, đôi mắt mở nhưng không có tiêu cự, nước mắt vẫn còn đọng lại nơi khóe mắt như một dấu vết không thể xóa. Mẹ em đứng bên cạnh, gương mặt trắng bệch, môi run nhưng không nói gì, chỉ nhìn mọi thứ như thể chưa kịp hiểu chuyện gì đang xảy ra.

Rồi – ánh mắt họ chạm nhau. Một giây rất ngắn nhưng đủ để mọi thứ vỡ ra trong lòng em.

“Cháu là người nhà?” – Một giọng nói vang lên.

Em quay lại nhìn, là một người đàn ông mặc đồng phục, ánh mắt sắc, giọng nói bình tĩnh đến mức lạnh lẽo.

“Tôi là Trần Minh Hoàng. Phó trưởng.” - Ông ta nhìn em từ đầu đến chân bằng gương mặt không biểu cảm.

“Cháu đi theo tôi.”`,
    '14.2': `CHƯƠNG 14.2: GÁNH TỘI THAY (2)

Phòng thẩm vấn sáng đến chói mắt. Ánh đèn trắng chiếu thẳng xuống, không góc khuất, không nơi để trốn. Không khí lạnh, tĩnh, mỗi âm thanh nhỏ cũng vang lên rõ ràng đến mức khiến người ta khó thở. Em ngồi đó, hai tay đặt trên bàn, siết chặt đến mức đầu ngón tay trắng bệch, nhưng gương mặt lại gần như không có biểu cảm.

Những gì ba dặn… vẫn còn vang trong đầu. Từng câu từng chữ như một sợi dây duy nhất giữ em không sụp đổ.

Lời nói thoát ra môi em không run không lệch, như thể đang kể lại một câu chuyện không liên quan đến mình. Mọi thứ diễn ra đúng như vậy cho đến khi cánh cửa mở ra, một người bị dẫn vào, tiếng xích sắt rất khẽ nhưng đủ để cắt ngang tất cả.

Em ngẩng đầu, và khi nhìn thấy toàn bộ thế giới như dừng lại.

Chu Khánh Trì. Hắn đứng đó, áo khoác cũ, gương mặt bình tĩnh, ánh mắt không thay đổi như thể tất cả những gì vừa xảy ra… chưa từng chạm đến hắn.

“Là tôi làm.” - Hắn nói không cần suy nghĩ, không do dự - “Người đó là tôi đánh.”

Căn phòng im lặng một giây, hai giây, rồi mọi thứ… rẽ sang một hướng hoàn toàn khác.

“Không…” – Giọng em bật ra, khàn đặc – “không phải…”

Nhưng không ai nghe, hoặc… không ai muốn nghe.

Vụ án quá rõ ràng. Một người tự thú, một hung khí có dấu vân tay, một lời khai trùng khớp. Nhanh - Gọn - Hoàn hảo. Cảnh sát trưởng gật đầu, không cần thêm, không điều tra tiếp. Hồ sơ… được khép lại.

Qua lớp kính mờ, hai người đứng đối diện nhau nhưng không chạm được, không tới gần được, chỉ có thể nhìn.

Em đứng đó, hai tay đặt lên mặt kính, run đến mức không giữ được bình tĩnh nữa. Nước mắt trào ra, không kìm lại, rơi xuống, nhòe đi cả tầm nhìn.

“Tại sao…?” – Giọng em vỡ ra – “Tại sao anh lại làm vậy…?”

Chu Khánh Trì nhìn em, ánh mắt hắn không còn lạnh, mà mềm đi rất nhẹ, đủ để khiến tim người khác đau.

“Vì em còn tương lai.” Một câu đơn giản nhưng nặng đến mức khiến em không thở nổi.

“Còn anh thì sao?!” – Em bật lên, gần như gào – “Tương lai của anh thì sao?!”

Hắn im lặng một giây rồi khẽ cười. Một nụ cười nhợt nhạt nhưng bình yên đến lạ.

“Tương lai anh…” – Hắn nói, giọng thấp – “…là em.”

Em sững lại, mọi âm thanh biến mất, chỉ còn lại câu nói đó lặp đi lặp lại trong đầu, trong tim.

“…đồ ngốc…” – Em nghẹn lại, nước mắt rơi xuống nhiều hơn – “đồ ngốc…”

Hắn không phản bác, chỉ nhìn em như muốn ghi nhớ. Rồi hắn quay lưng đi không chần chừ. Bước vào phía sau cánh cửa sắt, nơi ánh sáng không còn chạm tới, bóng lưng hắn dần chìm vào bóng tối. Và trước khi hoàn toàn biến mất – một giọng nói rất khẽ vang lên như tan vào không khí.

“Hoa hướng dương của anh… phải sống thật tốt.”`,
  },
  'chu-khanh-kien': {
    1: `CHƯƠNG 1: TRO TÀN TRONG ĐÊM

Thành phố ấy về đêm luôn mang một mùi hương rất riêng. Không phải mùi nước hoa đắt tiền tỏa ra từ những khu trung tâm sáng đèn, cũng chẳng phải hương cà phê thơm nức từ các quán mở cửa thâu đêm dành cho những người có tiền. Thành phố của {{user}} mang mùi nước mưa cũ đọng trong cống rãnh, mùi thuốc lá cháy dở bị giẫm nát bên vệ đường, mùi bia rượu chua gắt phả ra từ những quán nhậu ven hẻm chưa kịp đóng cửa lúc nửa đêm. Xen lẫn trong đó là hơi lạnh ẩm mốc của những dãy chung cư lao động đã tồn tại quá lâu, nơi tường nhà bong tróc vì nước thấm, hành lang tối tăm như thể ánh đèn ở đây chưa từng đủ sức soi sáng mọi ngóc ngách.

Người ta thường nói thành phố này phồn hoa, là nơi chỉ cần đủ nỗ lực, bất kỳ ai cũng có thể tìm được cơ hội đổi đời. Nhưng chỉ những kẻ sống dưới đáy xã hội mới hiểu, ánh đèn càng rực rỡ bao nhiêu, bóng tối bị che khuất bên dưới lại càng sâu bấy nhiêu.

{{user}} sinh ra ở một nơi như thế.

Tuổi thơ của em chẳng có bao nhiêu điều đáng nhớ. Không có bánh sinh nhật với những ngọn nến lung linh, không có những buổi tối quây quần bên mâm cơm nóng hổi, cũng chẳng có ai dịu dàng xoa đầu mỗi khi em bật khóc vì một cơn sốt giữa đêm. Trong ký ức từ thuở nhỏ đến lúc trưởng thành, những âm thanh còn sót lại rõ ràng nhất chỉ là tiếng chửi rủa, tiếng chai rượu nện mạnh xuống nền gạch, tiếng người đàn ông say khướt gào thét giữa đêm như một con thú bị dồn vào đường cùng, cùng tiếng khóc mà em luôn cố nuốt ngược trở lại trong cổ họng.

Căn phòng trọ của hai cha con nằm sâu trong một khu lao động cũ gần bến xe phía Tây thành phố. Mùa mưa, nơi ấy thường xuyên ngập nước; mùa nắng, căn phòng thấp bé lại nóng hầm hập chẳng khác nào một chiếc lò nung. Những bức tường ám màu khói thuốc lâu năm, lớp vôi bong ra từng mảng. Trần nhà thấp, cửa sổ nhỏ, mỗi khi thời tiết oi bức, mùi mồ hôi hòa cùng mùi cồn và khói thuốc lại quẩn quanh trong không gian chật hẹp, khiến người ta có cảm giác ngay cả việc hít thở cũng trở nên khó khăn.

Mẹ em từng sống ở đó.

Nhưng năm {{user}} mười tuổi, bà bỏ đi. Không một lời nhắn nhủ, không một lời giải thích, cũng chẳng mang theo thứ gì đáng kể. Cánh cửa phòng trọ khép lại sau lưng bà, rồi từ đó về sau, em chưa từng gặp lại mẹ mình.

Người đàn ông còn ở lại với em là cha em, một kẻ nghiện rượu và cờ bạc nặng. Ông ta có thể biến mất suốt nhiều ngày trong những sòng bài chật hẹp nồng nặc khói thuốc, để rồi trở về với đôi mắt đỏ ngầu, quần áo nhăn nhúm và mùi rượu nồng nặc bám đầy trên người.

Những hôm thắng tiền, ông ta thường nằm vật ra giường, ngủ mê mệt như một khúc gỗ. Nhưng những hôm thua sạch, cả căn phòng trọ đều trở thành nơi để ông trút giận. Tiếng đồ đạc đổ vỡ, tiếng chửi bới và những lời lẽ cay nghiệt nối tiếp nhau vang lên. Trong căn phòng nhỏ ấy, người duy nhất phải hứng chịu tất cả chính là đứa con gái không có khả năng chống trả.

Bởi vậy, {{user}} học cách hiểu chuyện từ rất sớm.

Em biết cách im lặng khi nghe thấy tiếng bước chân loạng choạng ngoài hành hành lang. Biết cách thu mình sát vào góc tường để tránh những cái tát bất chợt. Biết cách giả vờ ngủ thật say, hy vọng cha sẽ không dựng mình dậy giữa đêm chỉ để sai đi mua rượu. Có những ngày tan học trở về, em còn chưa kịp thay bộ đồng phục đã phải quỳ xuống lau sạch những vết bẩn trên sàn nhà. Có những đêm, em ngồi đan đồ thủ công đến gần sáng để kiếm thêm tiền mua gạo, những ngón tay nhỏ bé bị kim đâm đến bật máu nhưng vẫn không dám dừng lại.

Em đã quen với việc tự chăm sóc những vết thương của mình. Cũng quen với việc không hỏi tại sao cuộc đời người khác có thể bình yên, còn cuộc đời em lại luôn đầy rẫy những chuyện chẳng thể nói cùng ai.

Thỉnh thoảng, vài người hàng xóm thương tình gọi em sang phụ rửa bát hoặc bưng bê ở quán cơm đầu hẻm. Tiền công chẳng đáng bao nhiêu, nhưng ít nhất cũng đủ để em mua chút thức ăn và thuốc sát trùng cho những vết thương trên người. Không ai hỏi vì sao em thường xuyên bị bầm tím, còn em cũng chưa từng chủ động kể với ai.

Em hiểu rằng trên đời này không phải nỗi đau nào cũng có người muốn lắng nghe. Đôi khi, ngay cả khi đã cố gắng im lặng và chịu đựng, người ta vẫn chẳng được yên thân.

Ở trường, {{user}} là kiểu học sinh dễ trở thành mục tiêu bắt nạt nhất.

Một đứa con gái luôn cúi đầu, mặc bộ đồng phục bạc màu đã sờn chỉ, đi đôi giày rách được khâu đi khâu lại nhiều lần, trên người thường phảng phất mùi thuốc sát trùng rẻ tiền. Em không có gia đình đủ khả năng đứng ra bảo vệ, cũng chẳng có ai khiến những kẻ bắt nạt phải kiêng dè. Trong mắt một số người, em gần như là đối tượng hoàn hảo để biến thành trò tiêu khiển.

Ban đầu chỉ là vài câu cười cợt.

“Nhà mày nghèo tới mức không mua nổi đôi giày mới hả?”

“Nghe nói ba nó tối nào cũng bị đòi nợ.”

“Người nó lúc nào cũng có mùi ghê chết đi được.”

Những lời chế giễu dần trở thành chuyện thường ngày. Cặp sách của em bị giấu đi, bài kiểm tra bị xé nát, nước bẩn bị đổ lên bàn học. Có lần, ngay giữa hành lang, một nam sinh túm tóc kéo giật em ra sau, khiến đám đông xung quanh cười ầm lên như vừa chứng kiến một trò vui thú vị.

Không phải ai cũng tham gia bắt nạt em, nhưng rất ít người chịu đứng ra ngăn cản.

Điều đáng sợ nhất chưa bao giờ chỉ là những hành vi bạo lực, mà còn là ánh mắt của những người chứng kiến. Thầy cô nhìn thấy rồi giả vờ không thấy. Bạn học nghe rõ từng lời nhục mạ nhưng chỉ cúi đầu, bước nhanh qua hành lang như thể chẳng có chuyện gì xảy ra.

Không ai muốn dây vào nhóm học sinh kia. Gia đình chúng có tiền, có quan hệ, chỉ cần một cuộc điện thoại là đủ khiến mọi chuyện biến thành một vụ hiểu lầm tuổi mới lớn. Còn em, dù có nói ra cũng chẳng chắc nhận được một lời bênh vực.

Dần dần, {{user}} hiểu rằng sự bất công đôi khi chẳng cần đến những lời đe dọa hay những hành vi quá đáng. Chỉ cần tất cả những người có khả năng lên tiếng đều lựa chọn im lặng, kẻ yếu thế đã có thể bị đẩy vào đường cùng.

Rồi mùa đông năm ấy đến.

Đó là mùa đông lạnh nhất mà em từng trải qua, không chỉ bởi những cơn gió buốt giá tràn qua các dãy nhà cũ, mà còn bởi những gì đã xảy ra trong quãng thời gian ấy.

Gió lùa qua hành lang, phát ra âm thanh rít dài giữa những bức tường ẩm mốc. Thành phố vừa trải qua một trận mưa, mặt đường loang lổ nước đọng phản chiếu ánh đèn đường vàng nhạt, khiến những vệt sáng méo mó nằm chồng lên nhau trên nền nhựa đường đen sẫm.

Hôm ấy, giáo viên giữ {{user}} ở lại dọn kho dụng cụ thể thao đến rất muộn. Khi em bước ra khỏi cổng trường, trời gần như đã tối hẳn. Con đường phía sau trường vắng tanh, những bóng đèn cũ kỹ chập chờn, lúc sáng lúc tắt. Gió lạnh thổi qua những tán cây trơ trụi, cuốn theo mùi đất ướt và hơi lạnh từ mặt đường.

Em nhớ rõ khoảnh khắc một bàn tay bất ngờ bịt chặt miệng mình.

Mùi bia rượu cùng khói thuốc xộc thẳng vào mũi, khiến em buồn nôn. Có người túm tóc kéo em ngã xuống nền đất lạnh ngắt. Bộ đồng phục bị kéo lê trên mặt xi măng thô ráp, đầu gối trầy xước, tiếng cười của những kẻ xung quanh vang lên méo mó trong bóng tối.

Đó là nhóm học sinh từng bắt nạt em ở trường.

Lần này, chúng không còn xem em như một trò đùa đơn thuần. Chúng đưa em đến căn nhà hoang phía sau bãi đất trống, nơi những ô cửa kính đã vỡ từ lâu, gió đêm lùa qua các khe tường tạo thành từng luồng lạnh buốt. Bên trong nồng nặc mùi bụi bẩn và ẩm mốc, nền nhà phủ đầy những mảnh vụn không rõ nguồn gốc.

Những gì xảy ra trong căn nhà hoang ấy đã trở thành một phần ký ức mà {{user}} không thể nhớ lại một cách trọn vẹn.

Nhiều lần sau này, khi cố gắng ghép nối những mảnh ký ức rời rạc, em chỉ nhớ được vài hình ảnh hỗn loạn: tiếng cười, ánh đèn flash điện thoại lóe lên liên tục trong bóng tối, những lời đe dọa đứt quãng và cảm giác đau đớn khiến mọi thứ trước mắt trở nên mơ hồ. Những ký ức ấy không liền mạch, nhưng chỉ cần một âm thanh hay hình ảnh vô tình gợi nhắc, chúng vẫn đủ sức kéo em trở lại đêm mùa đông ấy.

Khi bị bỏ lại trong căn nhà hoang, {{user}} gần như không còn đủ sức cử động. Tai trái ù đặc sau một cú đánh mạnh vào đầu, máu chảy dọc xuống cổ, lạnh ngắt giữa tiết trời mùa đông. Em nằm co ro trên nền đất bẩn cho đến gần sáng, sau đó mới gắng gượng bò ra ngoài.

Bác sĩ thông báo thính giác bên tai trái của em đã bị tổn thương vĩnh viễn.

Nhưng những thương tích trên cơ thể vẫn chưa phải điều tồi tệ nhất. Điều khiến cuộc đời em thực sự rơi xuống vực sâu chính là những gì xảy ra sau khi sự việc bị phơi bày.

Nhà trường tìm cách ém nhẹm vụ việc vì sợ ảnh hưởng đến danh tiếng. Phụ huynh của nhóm học sinh kia tìm đến, mang theo một khoản tiền lớn, đặt nó trước mặt gia đình em như thể chỉ cần đủ tiền là có thể giải quyết mọi chuyện.

Họ nói em nên im lặng.

Họ nói em phải biết nghĩ đến tương lai.

Họ nói đừng vì một phút bồng bột của tuổi trẻ mà hủy hoại cuộc đời những đứa trẻ vẫn còn nhỏ.

Từng lời được nói ra bằng giọng điệu bình thản, thậm chí có phần ban ơn, như thể người phải gánh chịu hậu quả mới là kẻ cần biết điều.

Người đàn ông được gọi là cha của em chẳng mấy quan tâm đến những lời ấy. Ánh mắt ông ta chỉ dán chặt vào xấp tiền dày cộm, đôi mắt sáng rực lên vì lòng tham và men rượu. Ông ta đếm tiền, kiểm tra từng tờ, rồi nhanh chóng gật đầu đồng ý, vội vàng đến mức như thể chỉ sợ người khác đổi ý trước khi ông kịp cất số tiền ấy vào túi.

Không ai hỏi {{user}} có đau không.

Không ai hỏi em có cần được bảo vệ hay không.

Cũng chẳng có ai thực sự quan tâm em sẽ phải sống thế nào sau khi mọi chuyện kết thúc.

Đối với những người có mặt hôm ấy, khoản tiền kia dường như đã đủ để khép lại tất cả. Một vụ việc gây ảnh hưởng đến danh tiếng được giải quyết, những gia đình có điều kiện tránh được rắc rối, còn người cha nghèo khổ có thêm tiền để tiếp tục cuộc sống của mình.

Chỉ có em là không nhận được bất cứ điều gì có thể gọi là công bằng.

Tệ hơn nữa, nhóm học sinh kia vẫn giữ lại đoạn video quay trong đêm hôm ấy. Nó trở thành công cụ để chúng tiếp tục khống chế em sau khi sự việc bị che giấu. Những cuộc gọi giữa đêm, những tin nhắn đe dọa và yêu cầu vô lý liên tục xuất hiện, buộc em phải sống trong trạng thái bất an triền miên.

Dần dần, {{user}} bắt đầu sợ tiếng chuông điện thoại hơn bất cứ âm thanh nào khác.

Chỉ cần màn hình bất ngờ sáng lên giữa đêm, em đã không thể giữ được sự bình tĩnh. Một thông báo mới cũng đủ khiến em nhớ đến những lời đe dọa, những hình ảnh không muốn nhìn lại và cảm giác bất lực khi biết rằng mình chẳng có cách nào tự bảo vệ bản thân.

Chiếc điện thoại vốn là phương tiện để liên lạc với thế giới bên ngoài, cuối cùng lại trở thành thứ khiến em không bao giờ có thể thực sự yên lòng.

Có một lần, {{user}} đứng trước gương rất lâu.

Tấm gương cũ đã mờ đục, những vết ố loang lổ che khuất một phần hình ảnh phản chiếu. Trong đó là một gương mặt mà chính em cũng cảm thấy xa lạ: đôi mắt thâm quầng vì những đêm mất ngủ, gò má hóp lại, làn da còn vương những vết bầm tím chưa tan hết.

Em nhìn mình trong gương, rồi bật cười.

Tiếng cười khô khốc vang lên trong căn phòng yên tĩnh, chẳng giống tiếng cười của một người đang vui vẻ. Nó chỉ tồn tại trong chốc lát, sau đó nhanh chóng tắt lịm, trả lại cho căn phòng sự im lặng quen thuộc.

Em đã từng nghĩ rằng chỉ cần mình ngoan ngoãn, chỉ cần không gây phiền phức cho ai, chỉ cần chịu đựng thêm một chút, có lẽ mọi chuyện rồi sẽ qua. Nhưng đến cuối cùng, sự im lặng của em không đổi lấy được bình yên, còn lòng nhẫn nhịn cũng chẳng khiến những người xung quanh trở nên tử tế hơn.

Thứ duy nhất em nhận được là một cuộc đời ngày càng xa rời hình dung ban đầu về hai chữ bình thường.

Đêm hôm ấy, {{user}} mang toàn bộ số tiền bồi thường ra bãi đất trống phía sau khu nhà.

Gió lạnh thổi tung mái tóc rối bời. Mặt đất vẫn còn ẩm sau trận mưa, những vũng nước nhỏ phản chiếu ánh đèn đường yếu ớt. Xa xa, thành phố vẫn sáng rực, tiếng xe cộ thỉnh thoảng vọng đến từ con đường lớn, nhắc nhở rằng ngoài nơi này, cuộc sống của rất nhiều người vẫn đang tiếp diễn như chưa từng có chuyện gì xảy ra.

Em ngồi xổm giữa nền đất ướt, chậm rãi châm lửa đốt từng xấp tiền.

Ngọn lửa ban đầu chỉ nhỏ bằng một đốm sáng, sau đó dần bùng lên, liếm qua những tờ giấy rồi cuộn chúng lại thành từng mảnh cong queo. Màu đỏ cam phản chiếu trong đôi mắt đã cạn khô nước mắt từ lâu. Những tờ tiền lần lượt hóa thành tro, bị gió đêm cuốn đi, rơi xuống mặt đất ẩm lạnh.

Đó là toàn bộ số tiền mà người ta dùng để mua lấy sự im lặng của em.

Cũng là thứ mà cha em đã vui vẻ nhận lấy, như thể nỗi đau của con gái mình chỉ đáng giá chừng ấy.

{{user}} không biết ngọn lửa sẽ cháy trong bao lâu. Em chỉ nhìn những tờ tiền biến mất từng chút một, nhìn thứ người khác xem là giá trị nhất hóa thành những mảnh tro tàn không còn hình dạng.

Trong đêm đông lạnh lẽo ấy, ngọn lửa đỏ rực giống như một đám tang lặng lẽ dành cho phần con người cuối cùng còn sót lại bên trong em.

Khi những tờ tiền cuối cùng cháy hết, bãi đất trống lại chìm vào bóng tối.

Thành phố vẫn sáng đèn.

Còn đống tro tàn trước mặt em, chẳng còn gì để chứng minh rằng đã từng có người dùng nó để định giá nỗi đau của một con người.`,
    2: `CHƯƠNG 2: KẺ ĐỨNG BÊN KIA BÓNG TỐI

Khu dân cư nằm trên cung đường hình chữ T ấy có một lời đồn rất kỳ lạ.

Đám học sinh trong vùng thường truyền tai nhau rằng, sau chín giờ tối, tuyệt đối không được đi ngang qua con đường dẫn vào đó. Nếu chẳng may phải về muộn, thà đi đường vòng xa thêm vài cây số còn hơn đặt chân vào khu vực ấy dù chỉ một lần.

Người lớn gọi nơi đó là “khu dưới”, còn lũ trẻ thì đặt cho nó một cái tên khác: khu của quỷ.

Ban ngày, nơi ấy trông chẳng khác gì những khu lao động nghèo khác trong thành phố. Những dãy nhà trọ thấp bé chen chúc dưới mạng lưới dây điện chằng chịt như tơ nhện. Các quán cơm bụi mở cửa từ sáng sớm, mùi dầu mỡ cũ kỹ quanh năm quẩn trong không khí. Người ta vẫn đi làm, vẫn buôn bán, vẫn tất bật mưu sinh, tựa như nơi này chẳng có gì khác biệt so với những khu dân cư bình thường.

Nhưng khi màn đêm buông xuống, mọi thứ bắt đầu thay đổi.

Ánh đèn neon đỏ tím từ các quán bar và quán nhậu lần lượt bật sáng, nhuộm những con hẻm hẹp thành một thế giới hỗn loạn. Tiếng nhạc điện tử dội xuyên qua lớp tường mỏng, làm những ô cửa kính rung lên từng hồi. Xe máy phân khối lớn rú ga giữa đêm, thi thoảng có tiếng chửi rủa cùng tiếng bàn ghế đổ vỡ vọng ra từ những góc khuất. Mùi thuốc lá cháy khét, bia rượu nồng nặc và đôi khi cả mùi máu tanh trộn lẫn vào nhau, tạo thành thứ không khí đặc trưng mà chỉ cần đi ngang qua một lần cũng đủ khiến người ta nhớ mãi.

Nơi đó là địa bàn của dân xã hội đen.

Cho vay nặng lãi, bảo kê, cờ bạc, mại dâm, ma túy… Những thứ bẩn thỉu nhất của thành phố đều âm thầm tồn tại dưới lớp vỏ hỗn loạn ấy. Các cuộc giao dịch diễn ra sau những cánh cửa đóng kín, những món nợ được giải quyết trong các con hẻm không có camera, còn những cuộc xung đột đôi khi kết thúc bằng tiếng kim loại va chạm chan chát giữa màn đêm.

Thỉnh thoảng, một tiếng súng khô khốc vang lên rồi nhanh chóng chìm vào im lặng.

Cảnh sát không phải chưa từng đặt chân vào nơi này, nhưng muốn tùy tiện xông vào khu dưới chưa bao giờ là chuyện đơn giản. Ai cũng hiểu, đằng sau vẻ ngoài nhếch nhác và hỗn loạn ấy là một mạng lưới ngầm đã cắm rễ sâu trong thành phố suốt nhiều năm. Một khi động đến một mắt xích, những cái tên phía sau có thể lần lượt xuất hiện, kéo theo vô số rắc rối mà chẳng ai muốn gánh chịu.

Đó là thế giới mà Chu Khánh Kiên đã sống từ khi còn chưa hiểu thế nào là đúng sai.

Hắn sinh ra ở nơi như thế.

Không ai biết cha mẹ hắn là ai. Người ta chỉ nhớ rằng, vào một đêm mưa lớn hai mươi năm trước, có người nghe thấy tiếng trẻ con khóc bên thùng rác phía sau khu chợ cá cũ. Khi chạy ra xem, họ phát hiện một đứa bé đỏ hỏn bị bỏ lại trong chiếc chăn mỏng đã ướt sũng nước mưa.

Đứa bé ấy chính là Chu Khánh Kiên.

Không có giấy tờ xác nhận thân thế, không có người thân đến nhận, cũng chẳng ai biết vì sao một đứa trẻ mới chào đời lại bị bỏ rơi ở nơi tồi tàn như vậy. Sau một hồi bàn bạc, những người trong khu cuối cùng cũng tìm được cách để đứa bé sống sót. Nhưng chẳng ai ngờ rằng, hai mươi năm sau, cái tên từng gắn với một đứa trẻ bị vứt bỏ ấy lại trở thành nỗi kiêng dè của không ít kẻ trong khu chữ T.

Chu Khánh Kiên chưa từng có một tuổi thơ đúng nghĩa.

Khi những đứa trẻ khác còn được người lớn dắt tay đến trường, hắn đã phải học cách sinh tồn giữa đám côn đồ, gái bán hoa và những kẻ nghiện ngập. Hắn lớn lên bằng cơm thừa từ các quán nhậu, bằng những lời chửi rủa giữa đêm và tiếng đánh nhau vang lên không dứt trong những con hẻm tối.

Ở nơi ấy, không ai dạy hắn cách trở thành một người tử tế. Những gì hắn học được chỉ là làm thế nào để không bị bắt nạt, làm thế nào để giữ lại thứ thuộc về mình và làm thế nào để khiến kẻ khác không dám tùy tiện động vào mình.

Đến năm mười ba tuổi, hắn đã biết cầm dao.

Mười lăm tuổi, hắn đánh gãy tay một gã đòi nợ thuê lớn hơn mình gần chục tuổi.

Mười bảy tuổi, cái tên Chu Khánh Kiên đã bắt đầu khiến đám lưu manh trong khu phải dè chừng.

Người nuôi hắn lớn là Hứa Đức Bình, đại ca có thế lực nhất khu chữ T thời bấy giờ. Hứa Đức Bình không phải người tốt theo bất kỳ tiêu chuẩn thông thường nào, nhưng ít nhất, ông ta đã cho đứa trẻ không nơi nương tựa ấy một chỗ để sống, một bát cơm để ăn và một vị trí trong thế giới mà những kẻ yếu thế thường chẳng có quyền lựa chọn.

Đổi lại, Chu Khánh Kiên phải học cách tồn tại theo quy tắc của nơi này.

Hắn vẫn nhớ một câu Hứa Đức Bình từng nói:

“Ở cái đất này, mềm lòng là chết.”

Câu nói ấy theo hắn qua nhiều năm, dần trở thành một thứ nguyên tắc ăn sâu vào xương tủy. Chu Khánh Kiên học cách sống như một con dao: lạnh lẽo, lì lợm, sắc bén và không dễ dàng để bất kỳ ai chạm vào phần bên trong mình.

Hắn không tin người khác.

Cũng chẳng trông đợi ai sẽ thật lòng đối xử tốt với mình.

Mười tám tuổi, Chu Khánh Kiên đã trở thành một kẻ có tiếng trong khu. Hắn làm đầu bếp tại quán nhậu lớn nhất khu phức hợp, một công việc nghe qua tưởng chừng đàng hoàng, nhưng thực chất chỉ là lớp vỏ che mắt cho những giao dịch bẩn thỉu diễn ra phía sau.

Trong gian bếp nóng hầm hập, hắn có thể bình thản thái thịt, nhóm lửa và nấu những món ăn được khách hàng khen ngợi. Nhưng khi bước khỏi cánh cửa phía sau, hắn lại trở về với thế giới mà một lời nói không hợp ý cũng có thể dẫn đến một cuộc ẩu đả.

Hắn cao lớn, vai rộng, mái tóc húi cua ngắn sát da đầu. Bên tai trái là chiếc khuyên bạc đã cũ, chẳng có gì nổi bật nhưng vẫn khiến gương mặt vốn lạnh lùng của hắn thêm phần bất cần. Tấm lưng xăm kín những hình vẽ đen chằng chịt, giống như những dấu ấn mà hắn mang theo từ thế giới tăm tối đã nuôi mình lớn lên.

Đôi tay hắn đầy những vết sẹo cũ mới đan xen, dấu tích của dao, gậy sắt và những cuộc hỗn chiến mà chính hắn cũng chẳng còn nhớ rõ đã xảy ra bao nhiêu lần.

Nhưng thứ khiến người khác e dè nhất vẫn là ánh mắt hắn.

Sắc bén, lạnh lẽo, luôn mang theo vẻ cảnh giác như một lưỡi dao được giấu trong bóng tối. Hắn không cần lớn tiếng để đe dọa ai, cũng chẳng cần cố tình phô trương sức mạnh. Đôi khi, chỉ một cái liếc mắt của Chu Khánh Kiên cũng đủ khiến những kẻ đang định gây chuyện tự biết đường mà lùi lại.

Đám con gái trong khu mê hắn đến phát điên. Từ những cô gái bán hoa ở đầu đường, nhân viên các quán karaoke cho đến những cô gái trẻ thích cảm giác nguy hiểm, không ít người muốn dây dưa với Chu Khánh Kiên một lần.

Nhưng hắn chưa từng thật sự để ai bước vào cuộc đời mình.

Thuốc lá, dao và những trận đánh nhau bất bại dường như đã chiếm trọn khoảng trống trong thế giới của hắn. Hắn có thể ngồi uống rượu với người khác đến tận sáng, có thể cười nhạt trước những lời ve vãn, cũng có thể lạnh lùng quay lưng ngay khi đối phương cho rằng giữa hai người đã có điều gì đó đặc biệt.

Đối với Chu Khánh Kiên, quan hệ giữa người với người phần lớn chỉ là trao đổi lợi ích. Kẻ đến vì tiền, người ở lại vì quyền lực, còn những lời ngọt ngào đôi khi chỉ là một cách khác để che giấu ý đồ.

Hắn đã quen với điều đó.

Cho đến khoảng hai tháng gần đây, một bóng dáng bắt đầu xuất hiện trong tầm mắt hắn.

Một nữ sinh trung học.

Lần đầu tiên nhìn thấy em là vào gần nửa đêm.

Hôm ấy, Chu Khánh Kiên vừa xử lý xong một vụ ẩu đả tại quán nhậu. Máu trên tay còn chưa kịp rửa sạch, điếu thuốc trên môi đã cháy gần hết. Hắn đứng tựa vào bức tường ngoài hẻm, lười biếng rít một hơi thuốc, mặc cho tiếng ồn ào phía sau dần tan đi.

Chính lúc ấy, ánh mắt hắn bắt gặp em.

Em đứng tại ngã rẽ giữa con đường lớn và lối dẫn vào khu đen của hắn. Dưới ánh đèn đường chập chờn sắp hỏng, bóng dáng em nhỏ bé đến mức gần như bị bóng tối nuốt mất. Bộ đồng phục đã cũ bạc màu, chiếc cặp sách được ôm chặt trước ngực, gương mặt trắng bệch như thể em vừa chạy trốn khỏi một chuyện gì đó vô cùng kinh khủng.

Chu Khánh Kiên không biết em là ai.

Hắn chỉ nhìn thấy một nữ sinh đứng lặng ở ngã rẽ vào giờ mà ngay cả người lớn trong khu cũng chẳng muốn ra đường nếu không có việc cần thiết.

Em đứng đó rất lâu.

Lâu đến mức hắn tưởng em đang đợi ai. Nhưng cuối cùng, em chỉ cúi đầu rồi lặng lẽ rời đi, bóng dáng nhỏ bé nhanh chóng biến mất khỏi tầm mắt giữa những con đường đan xen chằng chịt.

Chu Khánh Kiên không để chuyện ấy trong lòng.

Ít nhất, ban đầu hắn đã nghĩ như vậy.

Nhưng sau đêm đó, hắn lại nhìn thấy em thêm nhiều lần nữa.

Có hôm, em ngồi bó gối dưới mái hiên của một cửa hàng tiện lợi đã đóng cửa. Có hôm, em đứng rất lâu trên cầu vượt giữa đêm khuya rồi mới quay về. Có hôm, trên gương mặt em còn hằn những vết bầm tím chưa tan hết, nhưng dáng người vẫn lặng lẽ đi qua những con đường quen thuộc như thể đã quá mệt mỏi để quan tâm đến ánh mắt của người khác.

Những lần chạm mặt đều ngắn ngủi. Hắn chưa từng chủ động hỏi chuyện, còn em cũng chưa từng tìm đến hắn.

Giữa họ chẳng có bất kỳ mối liên hệ nào.

Một kẻ sống giữa thế giới ngầm của khu chữ T, một nữ sinh mang theo những bí mật mà người ngoài không thể hiểu được. Nếu đặt trong cuộc đời bình thường của người khác, có lẽ họ sẽ chẳng bao giờ có cơ hội bước vào thế giới của nhau.

Chu Khánh Kiên vốn không nên để tâm.

Thành phố này có hàng trăm, hàng nghìn người đang sống trong cảnh khốn khó. Mỗi ngày, hắn đều nhìn thấy những kẻ thất thế, những người bị đẩy đến đường cùng, những gương mặt mang theo vẻ mệt mỏi mà chỉ cần một đêm nữa thôi cũng có thể hoàn toàn gục ngã.

Hắn không phải người làm từ thiện, càng không có ý định cứu rỗi bất kỳ ai.

Thế nhưng, càng không muốn để ý, ánh mắt hắn lại càng vô thức tìm kiếm bóng dáng nhỏ bé ấy giữa dòng người. Dần dần, việc nhìn xem em có xuất hiện ở ngã rẽ quen thuộc hay không trở thành một thói quen mà chính hắn cũng chẳng hiểu nổi.

Hắn không biết mình đang chờ đợi điều gì.

Có lẽ chỉ là sự tò mò trước một người luôn xuất hiện vào những thời điểm kỳ lạ. Cũng có thể là cảm giác khó chịu mơ hồ mỗi khi bắt gặp những vết thương trên người em.

Dù là gì, Chu Khánh Kiên vẫn chưa từng gọi tên cảm giác ấy.

Hắn càng không nghĩ rằng, một bóng dáng chỉ tình cờ lọt vào tầm mắt lại có ngày khiến hắn phải dừng chân giữa đêm đông.

Rồi đêm đó xảy ra.

Đêm ấy, thành phố lạnh hơn thường ngày. Gió mùa tràn về sau một trận mưa lớn, khiến không khí buốt đến tận xương. Những con đường sau nửa đêm gần như chẳng còn bóng người, chỉ còn vài chiếc xe chạy ngang qua, để lại tiếng động cơ xa dần trong khoảng không vắng lặng.

Ánh đèn cao áp phản chiếu xuống mặt đường ướt nước, tạo thành những vệt sáng nhòe nhoẹt, kéo dài trên nền nhựa đường tối đen.

Chu Khánh Kiên một mình đi dọc theo con đường lớn cạnh bờ sông.

Hắn mặc áo thun đen, quần jean sẫm màu, bên ngoài khoác chiếc áo còn vương mùi khói thuốc và bia rượu từ quán nhậu. Điếu thuốc trên môi cháy lập lòe giữa màn đêm, mỗi lần hắn rít một hơi, đầu thuốc lại đỏ lên trong chốc lát rồi chìm vào bóng tối.

Bước chân hắn vốn chậm rãi, chẳng có vẻ gì là đang vội vã trở về.

Nhưng ngay khi nhìn thấy bóng người phía trước, Chu Khánh Kiên bỗng khựng lại.

Đó là một bóng dáng mà hắn đã gặp nhiều lần trong suốt hai tháng qua.

Em đang đứng trên thành cầu.

Gió lạnh thổi tung chiếc váy đồng phục mỏng manh, thân hình gầy gò chênh vênh giữa khoảng không tối đen bên dưới. Dòng sông mùa đông cuộn nước lặng lẽ, mặt nước đen sâu dưới ánh đèn đường, mang theo vẻ lạnh lẽo khiến người ta bất giác cảm thấy bất an.

Trong khoảnh khắc ấy, đồng tử Chu Khánh Kiên co rút lại.

Điếu thuốc vừa rít dở bị hắn ném xuống đất. Bước chân vốn lười biếng lập tức nhanh hơn, vẻ bất cần thường ngày trên gương mặt lạnh lùng cũng biến mất.

Gió trên cầu mạnh đến mức gần như cuốn phăng hơi ấm cuối cùng khỏi không khí. Mặt nước bên dưới tối đen, sâu hun hút. Ánh đèn thành phố phản chiếu trên dòng sông, vỡ thành những mảnh sáng chập chờn trôi theo dòng nước lạnh.

Em đã đứng ở nơi ấy, đối diện với khoảng tối phía trước.

Thành phố vẫn sáng đèn sau lưng, những tòa nhà cao tầng vẫn lấp lánh như thể mọi thứ đều đang diễn ra bình thường. Nhưng giữa khoảng cách ngắn ngủi ấy, dường như chẳng có điều gì thuộc về thế giới rực rỡ kia có thể chạm đến em.

Em đã trèo lên lan can cầu trong trạng thái gần như tê liệt cảm xúc. Phía sau lưng là ánh sáng lạnh lẽo của thành phố, phía trước là bóng tối sâu không thấy đáy.

Những tháng ngày bị dồn ép, những lời đe dọa dai dẳng và sự im lặng của những người lẽ ra phải bảo vệ em đã đẩy em đến một nơi mà trước đây có lẽ em chưa từng nghĩ mình sẽ đặt chân tới.

Đối với em, thành phố này quá rộng lớn, nhưng dường như lại chẳng có nổi một chỗ để em thực sự sống tiếp mà không phải sợ hãi.

Ngay khi những ngón tay em bắt đầu buông khỏi thanh sắt lạnh buốt, một lực mạnh bất ngờ giữ chặt lấy cổ chân em.

Chu Khánh Kiên đã kịp lao tới.

Hắn đứng phía dưới, một tay giữ lấy chân em, ngẩng đầu nhìn lên giữa màn gió lạnh. Gương mặt góc cạnh chìm trong ánh đèn nhợt nhạt, vai áo còn vương hơi nước mưa, mái tóc ngắn bị gió thổi rối. Đôi mắt đen sâu của hắn nhìn thẳng về phía em, mang theo vẻ nghiêm nghị hiếm thấy.

Trong ánh mắt ấy không có sự tò mò của một kẻ đứng xem chuyện náo nhiệt, cũng chẳng có vẻ khinh thường mà em đã quá quen thuộc khi bắt gặp trên gương mặt những người xung quanh.

Chỉ có sự căng thẳng bị nén chặt.

Chu Khánh Kiên nhìn thấy những vết bầm tím chằng chịt trên chân em. Ánh mắt hắn dần tối xuống, quai hàm siết lại.

Đó là lần đầu tiên sau rất nhiều năm, trong lòng hắn xuất hiện một cảm giác gần giống với tức giận.

Không phải kiểu tức giận thường thấy trước khi một trận đánh nhau bắt đầu, cũng chẳng phải cơn phẫn nộ khiến hắn muốn dùng nắm đấm để giải quyết mọi chuyện. Cảm giác lần này nặng nề hơn, âm ỉ hơn, giống như nhìn thấy một con vật nhỏ bị người ta giẫm đạp đến kiệt sức giữa đường mà chẳng ai buồn cúi xuống nhìn.

Hắn không biết chuyện gì đã xảy ra với em.

Nhưng hắn biết, một nữ sinh với dáng vẻ ấy không nên xuất hiện trên thành cầu vào một đêm lạnh như thế này.

Gió đêm gào thét xuyên qua cây cầu dài. Áo khoác của Chu Khánh Kiên bị gió thổi phần phật, bàn tay đang giữ lấy em vẫn không buông lỏng.

Hắn ngẩng đầu, giọng nói khàn thấp vang lên giữa tiếng gió, mang theo mùi thuốc lá rất nhạt.

“Nước mùa này lạnh lắm.”

Hắn dừng lại trong chốc lát, ánh mắt vẫn đặt trên bóng dáng nhỏ bé trước mặt.

“Em thật sự muốn nhảy xuống sao?”`,
    3: `# CHƯƠNG 3: NGƯỜI TRỞ VỀ TRONG MƯA

*— Hai tháng trước —*

Ngày hôm ấy, thành phố có mưa.

Không phải kiểu mưa lớn ào ạt đủ sức cuốn phăng mọi thứ trên đường, mà là cơn mưa phùn dai dẳng thường xuất hiện vào những ngày cuối năm. Mưa rơi lặng lẽ từ buổi sáng đến tận chiều tà, khiến mặt đường lúc nào cũng ướt nhẹp, những vũng nước ven đường phản chiếu ánh đèn neon thành từng mảng màu méo mó. Không khí lạnh lẽo và ẩm ướt len lỏi qua từng khe cửa, bám vào quần áo, thấm qua da thịt, để rồi đọng lại trong xương cốt bằng thứ rét buốt âm ỉ chẳng dễ gì xua tan.

Mẹ em trở về vào một buổi chiều như thế.

Không có lời báo trước, không có cuộc đoàn tụ cảm động, càng chẳng có cảnh người mẹ ôm chầm lấy đứa con đã xa cách nhiều năm rồi bật khóc như những bộ phim cũ thường chiếu trên chiếc tivi đặt trong quán nước đầu hẻm.

Bà chỉ đơn giản xuất hiện trong căn phòng trọ chật hẹp, ngồi đối diện với người đàn ông đã từng là chồng mình, như thể những năm tháng vắng mặt vừa qua chẳng qua chỉ là một chuyến đi dài.

Hôm ấy, em tan học muộn.

Bộ đồng phục đã bạc màu vì giặt giũ quá nhiều lần, phần cổ tay sờn cũ, vạt áo còn vương hơi nước mưa. Cái lạnh xuyên qua lớp vải mỏng khiến người em thỉnh thoảng run lên từng chập. Em bước lên cầu thang xi măng đã loang lổ những vết ố, bàn tay cầm quai cặp lạnh ngắt, trong đầu chỉ nghĩ đến chuyện trở về phòng, thay bộ quần áo ướt rồi nằm xuống nghỉ ngơi.

Thế nhưng, khi còn chưa đến trước cửa, em đã nghe thấy tiếng cười vọng ra từ bên trong.

Là tiếng cười của cha.

Em đã rất lâu rồi không nghe ông ta cười như thế.

Không phải tiếng cười khàn đặc sau những chầu rượu say khướt, cũng không phải thứ âm thanh điên loạn thường bật ra mỗi khi cơn giận mất kiểm soát. Đó là tiếng cười giả lả, niềm nở đến mức gần như nịnh nọt, giống hệt một người đang cố hết sức lấy lòng đối phương.

Em đứng lại trước cánh cửa khép hờ.

Một cảm giác bất an mơ hồ thoáng qua trong lòng, nhưng em không nghĩ nhiều. Em đẩy cửa bước vào.

Rồi nhìn thấy bà.

Người phụ nữ trong ký ức của em từng có mái tóc rất dài, thích mặc những chiếc váy hoa màu nhạt và thường ôm em ngủ vào những đêm cha em chưa say đến mức nổi giận. Trong ký ức ấy, vòng tay của mẹ từng là nơi hiếm hoi em có thể tìm được chút bình yên giữa căn nhà luôn tràn ngập tiếng cãi vã.

Nhưng người phụ nữ đang ngồi trước mặt em bây giờ đã khác xa hình ảnh đó.

Bà gầy đến mức gần như chỉ còn da bọc xương. Hai gò má hóp sâu, khóe mắt hằn những nếp nhăn cũ kỹ, mái tóc khô xác được búi vội phía sau gáy. Chiếc áo len màu be trên người đã cũ, phần tay áo hơi giãn, còn hai bàn tay đặt trên đầu gối thì gầy guộc đến mức những đường gân xanh tím hiện rõ dưới lớp da nhợt nhạt.

Bà ngẩng đầu nhìn em.

Ánh mắt ấy vẫn giống trong ký ức.

Vẫn nhu nhược, vẫn mềm yếu, vẫn mang theo vẻ bất an như một người luôn sợ hãi điều gì đó sẽ xảy ra. Nhưng sâu bên trong đôi mắt ấy dường như còn ẩn giấu một bí mật mà em không thể hiểu nổi. Bà nhìn em, môi khẽ run lên, như thể chỉ riêng việc đối diện với đứa con gái của mình cũng đã khiến bà phải cố gắng hết sức.

“Con…”

Bà gọi em rất khẽ.

Giọng nói nghẹn lại giữa chừng, không thể thốt ra thêm một lời nào.

Em đứng ở cửa, lặng lẽ nhìn bà.

Không vui mừng.

Không xúc động.

Cũng chẳng có nỗi đau đớn như em từng tưởng tượng.

Trong đầu em chỉ hiện lên một suy nghĩ lạnh nhạt đến mức chính em cũng cảm thấy xa lạ.

*À. Người này là mẹ mình.*

Chỉ vậy thôi.

Em từng nghĩ rằng, nếu một ngày nào đó mẹ trở về, có lẽ em sẽ khóc. Hoặc em sẽ trách bà vì đã bỏ mình lại, hỏi bà tại sao không quay về sớm hơn, tại sao có thể để mặc mình sống những tháng ngày ấy mà chẳng một lần xuất hiện.

Em đã tưởng tượng ra vô số lời muốn nói.

Thế nhưng, khi người ấy thực sự đứng trước mặt mình, tất cả những điều từng tích tụ trong lòng lại trở nên vô nghĩa.

Không có nước mắt.

Không có lời chất vấn.

Không có cả mong muốn được ôm lấy bà thêm một lần.

Chỉ còn một khoảng trống lặng lẽ nằm sâu trong lòng, giống như nơi từng chứa đựng tình cảm dành cho mẹ đã bị bỏ hoang từ rất lâu, đến mức ngay cả em cũng không còn nhớ nó từng có hình dạng như thế nào.

Cha em ngồi bên cạnh bật cười lớn, tiện tay rót thêm rượu vào chiếc ly trước mặt.

“Đứng đó làm gì? Mẹ mày về rồi, không biết chào à?”

Ông ta nói bằng giọng điệu của một người cha đang trách móc đứa con thiếu lễ phép. Thậm chí, trên gương mặt còn xuất hiện vẻ không hài lòng rất vừa phải, như thể người có lỗi trong cuộc đoàn tụ này chính là em.

Em không đáp.

Ánh mắt em lướt qua chai rượu trong tay ông ta, rồi dừng lại ở nụ cười niềm nở trên gương mặt ấy.

Thật nực cười.

Người đàn ông đang ngồi đó từng dùng chính bàn tay ấy đánh mẹ đến mức bà không thể đứng vững. Cũng chính ông ta từng khiến em phải co rúm trong góc phòng mỗi khi tiếng bước chân nặng nề vang lên ngoài cửa. Những lời chửi rủa, những cơn say và sự hung hăng thất thường của ông ta đã trở thành một phần quen thuộc trong cuộc sống của hai mẹ con.

Vậy mà bây giờ, ông ta lại có thể ngồi trước mặt mẹ em, cười nói niềm nở như một người chồng rộng lượng đã sẵn lòng tha thứ cho người vợ bỏ nhà đi nhiều năm.

Bộ dạng ấy khiến em buồn nôn.

Có lẽ trong căn phòng này, chỉ mình em còn nhớ rõ những chuyện đã xảy ra. Chỉ mình em biết vẻ dịu dàng kia giả tạo đến mức nào, cũng chỉ mình em hiểu rằng đằng sau nụ cười tưởng chừng vô hại ấy là một con người chưa bao giờ thực sự thay đổi.

Căn phòng trọ nhỏ bé bỗng giống như một sân khấu cũ kỹ.

Cha em là người đang diễn vai người chồng rộng lượng. Mẹ em ngồi đó với vẻ mặt bất an của một người vợ đầy tội lỗi. Còn em, đứa con gái bị bỏ lại suốt nhiều năm, lại trở thành khán giả duy nhất biết rõ toàn bộ câu chuyện phía sau lớp màn.

Chẳng ai hỏi em đã sống thế nào trong những năm qua.

Cũng chẳng ai hỏi những vết thương trên người em từ đâu mà có.

Cuộc đoàn tụ mà người ta vẫn thường ca ngợi, hóa ra chỉ là một màn kịch khác được dựng lên trong căn nhà đã mục ruỗng từ lâu.

---

Những ngày tiếp theo, mẹ em bắt đầu cố gắng bù đắp.

Bà dậy từ rất sớm để nấu cơm, thường xuyên đứng trong gian bếp nhỏ, cẩn thận chuẩn bị những món ăn đơn giản mà trước đây em từng thích. Khi em ngủ quên bên bàn học, bà lặng lẽ thu dọn sách vở, giặt bộ đồng phục đã bẩn rồi hong khô trước chiếc quạt cũ. Có hôm, bà ngồi bên cửa sổ vá lại phần cổ tay áo đã sờn rách, từng đường kim chậm chạp và vụng về, như thể chỉ cần khâu lại những chỗ vải bị rách thì cũng có thể vá lại được những năm tháng đã mất.

Một lần, em tan học về muộn.

Mưa rơi từ đầu giờ chiều, con hẻm trước khu trọ ngập nước, những chiếc xe chạy qua làm bùn đất bắn lên hai bên vỉa hè. Khi em đi đến đầu hành lang, em nhìn thấy mẹ đang đứng đợi dưới mái hiên, trên tay cầm một chiếc ô đã cũ.

Bà nhìn thấy em thì vội bước tới.

“Con về rồi à? Mưa lớn quá, mẹ cứ sợ con bị ướt…”

Bà vừa nói vừa đưa chiếc ô về phía em, trên gương mặt hiện lên một nụ cười dè dặt.

Em nhìn chiếc ô, rồi nhìn bàn tay đang chìa ra trước mặt mình.

Cuối cùng, em chỉ khẽ tránh sang bên cạnh để đi vào trong.

Nụ cười của bà chậm rãi cứng lại.

Không ai nói thêm lời nào.

Mẹ em vẫn tiếp tục làm những việc ấy trong những ngày sau đó. Bà cố gắng hỏi han chuyện trường lớp, hỏi em có ăn no không, có cần mua thêm sách vở hay không. Đôi khi, bà còn đứng ngoài cửa phòng rất lâu, dường như muốn tìm một chủ đề để bắt chuyện nhưng cuối cùng lại lặng lẽ quay đi.

Em biết bà đang cố gắng.

Chính vì biết, em mới càng cảm thấy ngột ngạt.

Tất cả đã quá muộn rồi.

Nếu một người bị bỏ mặc trong bóng tối quá lâu, họ có thể dần quên mất cảm giác được ánh sáng chạm vào mình là như thế nào. Đến một ngày, khi có ai đó bất ngờ mở cửa, thứ đầu tiên họ cảm nhận được chưa chắc đã là ấm áp, mà có thể chỉ là sự chói mắt và nỗi sợ hãi trước một điều xa lạ.

Em đã sống quá lâu trong những tháng ngày không có mẹ.

Tình cảm từng dành cho bà không biến mất chỉ sau một đêm. Nó đã hao mòn từng chút một, qua những lần em chờ đợi rồi thất vọng, qua những bữa cơm nguội lạnh, qua những đêm em chỉ có thể tự ôm lấy mình trong căn phòng tối om. Đến khi mẹ thực sự quay về, phần tình cảm ấy đã trở thành một thứ gì đó quá xa xôi để em có thể dễ dàng tìm lại.

Những lời dịu dàng của bà không khiến em thấy ấm áp.

Chúng chỉ giống một lớp băng mỏng phủ lên vết thương đã tồn tại quá lâu, không đủ sức chữa lành, cũng chẳng thể che giấu hoàn toàn những tổn thương bên dưới.

Có một lần, khi em đang ngồi bên bàn học, mẹ bước đến phía sau, nhẹ nhàng đưa tay muốn vuốt tóc em.

Gần như ngay lập tức, em nghiêng đầu tránh đi.

Động tác ấy diễn ra quá tự nhiên, đến mức chính em cũng không kịp suy nghĩ.

Bàn tay mẹ khựng lại giữa không trung.

Căn phòng bỗng yên tĩnh đến lạ thường.

Em không quay đầu, nhưng vẫn có thể cảm nhận được ánh mắt bà đang đặt trên mình. Một lúc sau, em nghe thấy tiếng bà khẽ hít vào, như thể đang cố nuốt xuống điều gì đó nghẹn nơi cổ họng.

Khi em vô tình nhìn sang, đôi mắt bà đã đỏ lên.

Em biết bà buồn.

Nhưng em không cảm thấy đau lòng.

Em chỉ thấy mệt mỏi.

Một kiểu mệt mỏi kéo dài đến mức người ta chẳng còn đủ sức để tức giận, cũng chẳng muốn tiếp tục truy hỏi ai đúng ai sai. Em không còn muốn biết vì sao mẹ bỏ đi, cũng không muốn nghe những lời giải thích mà có lẽ bà đã chuẩn bị suốt nhiều năm.

Bởi dù nguyên nhân là gì, những tháng ngày em đã trải qua vẫn không thể quay trở lại.

Những đêm em cần mẹ nhất, bà không ở đó.

Và bây giờ, khi bà trở về, em đã không còn là đứa trẻ từng đứng bên cửa sổ chờ đợi tiếng bước chân quen thuộc nữa.

---

Đêm hôm ấy, trời lạnh khủng khiếp.

Gió lùa qua những khe cửa cũ, phát ra âm thanh rít dài. Tấm rèm mỏng trước cửa sổ không ngừng lay động, còn ánh đèn đường bên ngoài hắt vào căn phòng một màu vàng nhợt nhạt.

Cha em hiếm hoi ngủ sớm sau cơn say kéo dài từ buổi chiều.

Em nằm quay mặt vào tường, hai mắt mở trừng trừng nhìn khoảng tối trước mặt. Bên tai trái lại bắt đầu đau nhức mỗi khi trở trời, cơn đau âm ỉ lan dọc xuống thái dương khiến em khó chịu đến mức không thể ngủ được.

Em đã quen với chuyện đó.

Cũng giống như đã quen với những tiếng cãi vã, những lời đe dọa và những âm thanh phát ra từ phía bên kia căn phòng mỗi khi cha em nổi giận.

Thế nhưng, đêm ấy, khi mọi thứ tưởng chừng đã yên tĩnh, em lại nghe thấy tiếng khóc của mẹ.

Rất nhỏ.

Đứt quãng.

Sau đó là những âm thanh mơ hồ từ chiếc giường cũ phía bên kia tấm vách ngăn. Giọng nói của cha, tiếng nức nở bị nén xuống của mẹ, rồi sự im lặng kéo dài đến nghẹt thở.

Em nằm bất động.

Ánh mắt dừng lại trên trần nhà loang lổ những vệt mốc đen. Những vết nứt ngoằn ngoèo chạy dọc theo lớp vữa cũ, chằng chịt như những đường rạn trên một món đồ đã bị bỏ quên quá lâu.

Em nhìn chúng rất lâu.

Trong khoảnh khắc ấy, em bỗng cảm thấy mọi âm thanh xung quanh trở nên xa xôi. Không phải vì căn phòng thực sự yên tĩnh, mà vì tâm trí em đã mệt mỏi đến mức không còn muốn tiếp nhận thêm bất kỳ điều gì.

Có những nỗi đau, khi lặp đi lặp lại quá nhiều lần, sẽ không còn sắc nhọn như ban đầu.

Chúng dần trở nên lì lợm, âm ỉ và lạnh buốt, giống một dòng nước ngầm chảy dưới lớp đất sâu. Không ai nhìn thấy, cũng chẳng ai nghe được, nhưng ngày qua ngày, nó vẫn âm thầm bào mòn mọi thứ trên đường đi của mình.

Em đã sống cùng thứ đau đớn ấy quá lâu.

Đến một lúc nào đó, ngay cả việc cảm thấy đau cũng trở thành một điều xa xỉ.

Em chậm rãi ngồi dậy, mở ngăn kéo lấy băng gạc rồi quấn quanh bên tai trái. Động tác của em rất thuần thục, chẳng cần bật đèn, cũng không cần soi gương. Em đã làm việc này nhiều lần đến mức đôi tay gần như tự biết phải làm gì.

Sau đó, em khoác chiếc áo đồng phục lên người, cầm lấy điện thoại rồi mở cửa bước ra ngoài.

Không ai gọi em lại.

Cũng chẳng ai nhận ra em đã rời đi.

Cánh cửa khép lại phía sau, ngăn cách em với căn phòng chật hẹp và những âm thanh vẫn còn vang lên trong bóng tối.

Em bước xuống cầu thang.

Một bậc.

Rồi thêm một bậc nữa.

Bóng dáng gầy gò nhanh chóng khuất sau góc tường, để lại phía sau căn nhà mà em chưa từng cảm thấy mình thực sự thuộc về.

---

Con hẻm phía dưới chìm trong thứ ánh sáng đỏ xanh nhấp nháy từ bảng hiệu của một tiệm tạp hóa cũ.

Mưa vừa tạnh, mặt đường còn đọng nước. Những vệt sáng phản chiếu trên nền xi măng gồ ghề, méo mó theo từng gợn nước nhỏ, khiến cả con hẻm trông giống như một bức tranh bị ngâm quá lâu trong màu mực loãng.

Em đứng dưới ánh đèn ấy rất lâu.

Bộ đồng phục cũ đã thấm hơi lạnh, mái tóc hơi ẩm dính vào hai bên má. Hai tay em buông thõng bên người, chiếc cặp sách được giữ hờ trong một bàn tay, còn ánh mắt chỉ lặng lẽ nhìn về phía cuối con đường.

Em không biết mình đang chờ điều gì.

Có lẽ em chỉ chưa muốn trở về.

Trong căn phòng ấy, mẹ đã quay lại nhưng mọi thứ vẫn không thay đổi. Những cuộc gọi vào nửa đêm vẫn xuất hiện, những tin nhắn đe dọa vẫn sáng lên trên màn hình điện thoại, những lần em bị ép buộc phải đi theo đám người kia vẫn tiếp diễn như một cơn ác mộng không có điểm kết thúc.

Mỗi lần trở về, em đều lang thang ngoài đường thật lâu trước khi bước vào nhà.

Em không muốn nhìn thấy cha.

Không muốn nghe những câu hỏi han của mẹ, càng không muốn nhìn vẻ mặt áy nháy mà bà luôn cố giấu mỗi khi đối diện với mình.

Bởi mỗi lần nhìn thấy ánh mắt ấy, em lại nhớ đến những năm tháng đã qua. Nhớ những lần mình từng chờ đợi, từng hy vọng, rồi cuối cùng chỉ có thể tự mình vượt qua mọi chuyện.

Em cũng không muốn soi gương.

Dạo gần đây, mỗi lần nhìn vào gương, em đều có cảm giác người đang đứng phía bên kia không còn giống mình nữa. Đôi mắt ấy quá mệt mỏi, gương mặt ấy quá xa lạ, còn nụ cười thì đã biến mất từ lúc nào chẳng rõ.

Em vẫn đi học.

Vẫn làm bài tập.

Vẫn bước qua những con đường quen thuộc mỗi ngày.

Nhưng tất cả chỉ giống như một chuỗi hành động được lặp lại theo thói quen, không còn mang theo bất kỳ mong đợi nào.

Có lẽ, nếu cứ tiếp tục như vậy, em sẽ còn có thể chịu đựng thêm một thời gian nữa.

Em từng nghĩ thế.

Cho đến buổi chiều hôm ấy.

---

Hành lang tầng bốn rất vắng.

Sau cơn mưa, không khí ẩm nặng đến khó thở. Những giọt nước từ đường ống cũ nhỏ tí tách xuống nền xi măng lạnh ngắt, âm thanh đều đặn vang lên giữa khoảng không tĩnh lặng.

Em vừa bước lên cầu thang thì nghe thấy giọng mẹ vọng ra từ góc khuất cuối hành lang.

Bà đang khóc.

Em vô thức dừng chân.

Qua khe sáng mờ nhạt giữa hai cánh cửa, em nhìn thấy mẹ đang đứng trước một người đàn ông mặc vest đen.

Ông ta hoàn toàn lạc lõng giữa khu chung cư cũ kỹ này.

Đôi giày da sạch bóng, chiếc đồng hồ bạc trên cổ tay và bộ quần áo được chăm chút tỉ mỉ khiến ông ta khác hẳn những người thường xuyên xuất hiện trong khu. Trên người ông ta còn phảng phất mùi nước hoa nhàn nhạt, lạnh lẽo và xa lạ, chẳng ăn nhập chút nào với mùi ẩm mốc đang bao trùm hành lang.

Mẹ em cúi đầu, hai bàn tay siết chặt trước ngực.

Em không nghe được đoạn đầu cuộc trò chuyện.

Chỉ đến khi người đàn ông kia im lặng, giọng mẹ mới nghẹn ngào vang lên.

“… Tôi muốn đưa con bé cho ông.”

Bốn chữ cuối cùng rơi xuống rất khẽ.

Nhưng đối với em, chúng chẳng khác nào một tiếng động đột ngột vang lên giữa căn phòng hoàn toàn yên tĩnh.

Em đứng bất động.

Trong khoảnh khắc ấy, dường như toàn bộ máu trong người đều lạnh đi. Bên tai trái bắt đầu ù đặc, âm thanh xung quanh trở nên méo mó, còn hành lang trước mắt chao đảo như thể em đang đứng giữa một mặt nước không ngừng rung chuyển.

Em không dám nghe tiếp.

Cũng chẳng cần nghe tiếp.

Bởi em đã quá quen với cảm giác bị người khác xem như một món đồ có thể trao đổi, một gánh nặng cần được chuyển sang tay người khác, hoặc một thứ mà người ta có thể tùy ý quyết định số phận mà không cần hỏi ý kiến.

Em lùi lại một bước.

Gót giày va nhẹ vào bậc cầu thang phía sau.

Không ai quay đầu.

Mẹ vẫn đứng trước người đàn ông ấy, đôi vai run lên vì khóc. Còn em, đứa con gái mà bà vừa nhắc đến, chỉ có thể đứng ngoài cuộc trò chuyện của chính mình, nghe từng lời nói xa lạ quyết định tương lai mà chẳng ai buồn hỏi xem em có muốn hay không.

Một cảm giác lạnh lẽo chậm rãi tràn lên từ đáy lòng.

Em quay người bỏ chạy.

Không phải vì muốn tìm một nơi để trốn, mà bởi em không biết mình còn có thể đứng lại đó bằng cách nào.

Em chạy xuống cầu thang, băng qua hành lang ẩm thấp rồi lao ra khỏi khu chung cư. Gió lạnh lập tức ập vào mặt, nhưng em không dừng lại. Những con hẻm ngập nước mưa nối tiếp nhau trôi qua trước mắt, ánh đèn thành phố nhập nhòe thành những vệt sáng kéo dài.

Em không biết mình đang đi đâu.

Cũng chẳng biết còn nơi nào để quay về.

Trong đầu em chỉ còn một suy nghĩ lặp đi lặp lại, mỗi lúc một rõ ràng hơn.

*Nếu ngay cả mẹ cũng muốn đẩy mình đi…*

*Vậy trên đời này, rốt cuộc còn ai cần mình nữa?*

Em đã từng nghĩ, chỉ cần cố gắng chịu đựng thêm một chút, có lẽ mọi thứ rồi sẽ khá hơn. Có lẽ một ngày nào đó, những người làm tổn thương em sẽ dừng lại. Có lẽ mẹ sẽ thật sự trở thành người mẹ mà em từng mong đợi, còn căn nhà kia sẽ thôi không còn là nơi khiến em sợ hãi mỗi khi nghĩ đến.

Nhưng tất cả những hy vọng ít ỏi ấy dường như đã kết thúc vào buổi chiều mưa đó.

Người mẹ em từng chờ đợi đã trở về.

Chỉ là lần này, bà không trở về để đưa em ra khỏi bóng tối.

Bà muốn giao em cho một người đàn ông xa lạ.

Còn em, sau bao nhiêu năm cố gắng tồn tại, cuối cùng lại nhận ra mình vẫn chỉ là một người không có quyền lựa chọn ngay cả đối với cuộc đời của chính mình.

---

Đến khi nhận ra, em đã đứng trên cây cầu ấy từ lúc nào không biết.

Gió sông mùa đông thổi dữ dội, luồn qua lớp đồng phục mỏng manh, khiến tay chân em tê cứng. Mặt nước phía dưới đen ngòm, sâu hun hút, những ánh đèn thành phố phản chiếu trên đó rồi vỡ vụn theo từng đợt sóng.

Em không nhớ mình đã đi qua bao nhiêu con đường.

Cũng không nhớ đã đứng ở đó bao lâu.

Chỉ biết rằng, trong khoảnh khắc ấy, mọi thứ xung quanh đều trở nên xa lạ. Tiếng xe cộ từ phía sau, ánh đèn từ những tòa nhà cao tầng, cả thành phố rộng lớn vẫn đang tiếp tục cuộc sống của nó, nhưng chẳng có thứ gì khiến em cảm thấy mình còn thuộc về nơi này.

Em đã mệt mỏi quá lâu rồi.

Mệt mỏi vì phải sợ hãi.

Mệt mỏi vì phải im lặng.

Mệt mỏi vì mỗi lần cố gắng tin tưởng một ai đó, em lại nhận ra mình chỉ đang tự đặt thêm một hy vọng mong manh vào tay người khác.

Và bây giờ, ngay cả người mà em từng nghĩ sẽ không bao giờ bỏ rơi mình cũng đã lựa chọn đẩy em đi.

Em trèo lên lan can cầu trong trạng thái gần như tê liệt. Gió lạnh thổi tung mái tóc, những ngón tay bấu chặt vào thanh sắt buốt giá. Phía trước là dòng sông tối đen, phía sau là thành phố vẫn sáng đèn, xa hoa và lạnh lùng như thể chưa từng biết đến sự tồn tại của em.

Em không còn biết phải làm gì nữa.

Cũng không biết nếu quay về, mình sẽ phải đối diện với điều gì.

Trong khoảnh khắc ấy, tất cả những lời chưa từng được nói ra, những tổn thương chưa từng được ai nhìn thấy và những hy vọng đã bị dập tắt dường như cùng lúc đè nặng lên lồng ngực em.

Rồi một bàn tay bất ngờ giữ chặt lấy cổ chân em.

Em giật mình.

Một giọng nói khàn thấp vang lên giữa tiếng gió.

“Nước mùa này lạnh lắm.”

Em cúi đầu, nhìn thấy người đàn ông đang đứng bên dưới.

Hắn cao lớn, mặc áo thun đen và quần jean sẫm màu. Mái tóc ngắn bị gió thổi rối, gương mặt góc cạnh chìm một nửa trong bóng tối. Đôi mắt đen sâu nhìn thẳng về phía em, không có vẻ thương hại, cũng chẳng mang theo sự tò mò của một kẻ tình cờ bắt gặp chuyện náo nhiệt.

Hắn chỉ nhìn em.

Bàn tay vẫn giữ chặt, không hề có ý định buông ra.

Gió đêm gào thét qua cây cầu dài. Phía xa, thành phố vẫn sáng đèn, những tòa nhà cao tầng lấp lánh như thể chưa từng có chuyện gì xảy ra.

Một lúc lâu sau, em mới khẽ bật cười.

Tiếng cười nhỏ đến mức gần như tan biến ngay khi vừa thoát khỏi cổ họng. Không có vui vẻ, cũng chẳng có ý trêu chọc, chỉ là một âm thanh méo mó bật ra từ nơi đã chất chứa quá nhiều điều không thể nói thành lời.

Em nhìn người đàn ông xa lạ bên dưới.

Rồi khẽ hỏi:

“Nước lạnh sao?”

Em dừng lại một nhịp, đôi mắt trống rỗng phản chiếu ánh đèn nhợt nhạt trên cầu.

“Có lạnh bằng lòng người không?”`,
    4: `# CHƯƠNG 4: NGƯỜI ĐI RA TỪ BÓNG TỐI

Con đường phía sau cây cầu vắng lặng đến mức có thể nghe rõ tiếng gió rít qua những khe thép han gỉ. Thành phố về khuya giống như một cơ thể khổng lồ đã kiệt sức sau một ngày dài náo loạn. Những bảng hiệu neon từ các tòa nhà phía xa phản chiếu xuống mặt sông đen ngòm, tạo thành những vệt sáng méo mó, chập chờn theo từng đợt sóng. Thỉnh thoảng, một chiếc xe tải chạy ngang đại lộ, tiếng động cơ vọng đến từ xa rồi nhanh chóng chìm vào màn sương lạnh ẩm của mùa đông.

Trên cây cầu ấy, {{user}} vẫn đứng lặng giữa gió đêm.

Thời gian trôi qua đã lâu, đôi chân em dần tê cứng vì lạnh. Mái tóc rối bị gió thổi tung, tà váy đồng phục mỏng manh dính sát vào đôi chân gầy guộc. Hai bàn tay lạnh đến mất cảm giác, nhưng em dường như chẳng còn đủ tỉnh táo để nhận ra điều đó.

Có lẽ, khi con người phải chịu đựng quá nhiều đau đớn, ngay cả cảm giác lạnh cũng trở thành một chuyện không còn đáng bận tâm.

Người đàn ông bên dưới vẫn chưa rời đi.

Chu Khánh Kiên tựa lưng vào lan can cầu, một tay giữ lấy cổ chân em. Động tác ấy chẳng có vẻ gì là dịu dàng, nhưng bàn tay hắn vẫn giữ chắc, không hề có ý định buông lỏng. Hắn hiểu rõ chỉ cần mình sơ suất, tình hình trước mắt có thể lập tức trở nên nguy hiểm.

Tay còn lại, hắn chậm rãi lấy một điếu thuốc từ túi áo khoác đen.

Tiếng bật lửa vang lên giữa màn đêm tĩnh mịch. Một đốm lửa cam lóe sáng, soi rõ đường nét góc cạnh trên gương mặt hắn trong thoáng chốc, rồi nhanh chóng bị bóng tối nuốt mất. Chu Khánh Kiên cúi đầu châm thuốc, rít một hơi thật sâu. Khói trắng vừa thoát khỏi môi đã bị gió lạnh cuốn đi, tan vào khoảng không mờ mịt.

Hắn ngẩng đầu nhìn em.

“Tôi không biết em đã gặp chuyện gì.”

Giọng hắn khàn và thấp, mang theo sự trầm đục của một người thường xuyên thức đêm, hút thuốc và chẳng mấy khi để tâm đến sức khỏe của bản thân.

“Nhưng đừng làm chuyện dại dột chỉ vì những chuyện đang xảy ra.”

Hắn ngừng một chút, ánh mắt vẫn không rời khỏi em.

“Chuyện gì rồi cũng có cách giải quyết. Trước mắt, xuống đây đã.”

Lời nói ấy chẳng giống một lời an ủi được chuẩn bị cẩn thận. Hắn không hỏi em có chuyện gì, cũng chẳng cố nói những câu hoa mỹ về tương lai hay cuộc đời. Chu Khánh Kiên vốn không phải người biết cách an ủi kẻ khác. Hắn chỉ nói những gì mình nghĩ, bằng giọng điệu bình thản đến mức gần như lạnh lùng.

Thế nhưng, chính sự bình thản ấy lại khiến bức tường mà {{user}} đã cố gắng dựng lên suốt bao năm qua bất ngờ xuất hiện một vết nứt.

Không có dấu hiệu báo trước.

Cũng chẳng có một nguyên nhân rõ ràng nào để giải thích.

Em bật khóc.

Ban đầu chỉ là những tiếng nấc rất nhỏ, bị em cố gắng ghìm lại nơi cổ họng. Nhưng càng cố im lặng, hơi thở lại càng trở nên hỗn loạn. Hai vai em run lên, nước mắt không ngừng rơi xuống, còn những tiếng khóc bị kìm nén suốt thời gian dài cuối cùng cũng không thể tiếp tục giấu kín.

Em cúi gằm mặt, co người lại, mái tóc rũ xuống che gần hết gương mặt tái nhợt.

Em đã khóc rất nhiều lần trong những năm tháng trước đây.

Nhưng phần lớn thời gian, em đều phải tự lau nước mắt trước khi người khác phát hiện. Em không muốn cha nhìn thấy mình yếu đuối, không muốn những người đã làm tổn thương mình có thêm lý do để chế giễu, cũng chẳng còn trông đợi rằng chỉ cần khóc lên sẽ có ai đó bước đến ôm lấy mình.

Vậy nên, em đã học cách im lặng.

Học cách nuốt những lời muốn nói vào trong.

Học cách tự mình chịu đựng, ngay cả khi chẳng còn biết bản thân có thể tiếp tục được bao lâu.

Nhưng đêm nay, trước một người hoàn toàn xa lạ, tất cả những điều ấy dường như đều trở nên vô nghĩa.

Chu Khánh Kiên không nói gì.

Hắn chỉ đứng đó, im lặng nhìn em khóc.

Ánh mắt đen sâu dừng lại trên dáng người gầy gò đang run rẩy, rồi chậm rãi lướt qua những vết bầm tím nơi cổ tay, những vết trầy xước trên đầu gối và phần da lộ ra dưới cổ áo đồng phục. Những dấu vết ấy không giống thương tích do một lần vô ý té ngã. Chúng chồng chéo lên nhau, cũ mới đan xen, khiến người ta chỉ cần nhìn qua cũng đủ hiểu em đã trải qua những chuyện chẳng hề dễ dàng.

Khóe môi hắn khẽ siết lại.

Một cảm giác xa lạ bất chợt trồi lên từ nơi sâu nhất trong ký ức.

Mùi máu tanh trong những con hẻm cũ. Mùi thuốc sát trùng rẻ tiền ở những phòng khám nhỏ. Tiếng người kêu khóc trong đêm, tiếng chửi rủa của những kẻ say xỉn và những gương mặt tuyệt vọng mà hắn từng bắt gặp suốt những năm tháng lớn lên tại khu chữ T.

Chu Khánh Kiên đã nhìn thấy quá nhiều người bị cuộc đời đẩy đến đường cùng.

Hắn cũng từng chứng kiến những kẻ hôm trước còn cười nói, hôm sau đã trở thành một cái tên chẳng ai muốn nhắc đến. Ở nơi hắn sống, đau khổ không phải chuyện hiếm hoi, còn sự bất hạnh của người khác đôi khi chỉ là một cảnh tượng thoáng qua giữa đêm dài.

Hắn đã quen với việc nhìn thấy những điều ấy.

Quen đến mức chẳng còn muốn can thiệp.

Thế nhưng, ánh mắt của em khiến hắn nhớ đến một thứ mà hắn tưởng rằng bản thân đã quên từ lâu.

Đó là ánh mắt của một người không còn biết phải trông cậy vào đâu.

Không phải sự yếu đuối đơn thuần, cũng chẳng phải nỗi buồn có thể được xoa dịu chỉ bằng vài lời an ủi. Đó là vẻ trống rỗng của một người đã thất vọng quá nhiều lần, đến mức ngay cả hy vọng cũng trở thành một thứ xa xỉ.

Chu Khánh Kiên im lặng thêm một lúc.

Cuối cùng, hắn cất điếu thuốc đang cháy dở, bước sát lại rồi cẩn thận đỡ lấy em. Một cánh tay vòng qua người, giúp em rời khỏi vị trí nguy hiểm trên lan can. Động tác của hắn dứt khoát và chắc chắn, nhưng không hề thô bạo.

Hắn không hỏi em có đồng ý hay không vào lúc ấy. Trước hết, hắn chỉ muốn đưa em đến nơi an toàn.

Khi hai chân em chạm xuống mặt cầu, Chu Khánh Kiên vẫn giữ lấy cánh tay em thêm một lúc, chờ đến khi em có thể đứng vững mới chậm rãi buông ra.

Hắn đưa em đến ngồi tựa vào thành cầu bê tông phía sau.

Áo khoác đen trên người hắn còn vương mùi thuốc lá và hơi lạnh của gió đêm. Chu Khánh Kiên cúi xuống, lục trong túi áo rồi lấy ra một hũ thuốc nhỏ đã cũ. Nhãn mác trên nắp gần như bong hết, bên ngoài còn có vài vết xước. Đó là loại thuốc bôi thông dụng mà những người sống trong khu lao động nghèo thường giữ sẵn để xử lý những vết bầm tím thông thường.

Hắn đặt hũ thuốc vào lòng bàn tay em.

“Cầm lấy.”

{{user}} không nhận ngay.

Em chỉ ngẩng đầu nhìn hắn, đôi mắt đỏ hoe vẫn còn đọng nước. Ánh nhìn ấy trống rỗng đến mức khiến người đối diện khó lòng tiếp tục làm ngơ, như thể em vẫn chưa hiểu vì sao một người xa lạ lại xuất hiện ở đây, vì sao hắn lại chịu đứng giữa đêm lạnh chỉ để kéo em khỏi một nơi nguy hiểm.

Một lúc lâu sau, em mới khẽ hỏi:

“… Sao lại cứu tôi?”

Chu Khánh Kiên không trả lời ngay.

Hắn cúi đầu, lấy lại điếu thuốc đã tắt dở, nhưng cuối cùng cũng chẳng châm lửa. Những ngón tay thô ráp xoay nhẹ điếu thuốc giữa hai ngón tay, ánh mắt dừng ở một điểm nào đó trên mặt đất.

Gió thổi qua cây cầu, làm vạt áo khoác của hắn lay động.

Rất lâu sau, hắn mới bật ra một tiếng cười nhạt.

“… Vì tôi cũng từng giống em.”

Giọng hắn thấp đến mức gần như tan vào tiếng gió.

Hắn ngừng lại, ánh mắt thoáng trở nên xa xăm.

“Nhưng tôi không chết.”

Không có lời giải thích nào thêm.

Chu Khánh Kiên cũng không kể mình đã trải qua những gì, không nói về đứa trẻ từng bị bỏ lại bên chợ cá, càng không nhắc đến những năm tháng hắn phải tự học cách tồn tại giữa một thế giới chẳng hề dịu dàng với mình.

Hắn chỉ để lại một câu nói ngắn ngủi, rồi im lặng.

Có những chuyện, đối với người ngoài, dù kể ra cũng chưa chắc có ai hiểu được.

Và hắn đã quá quen với việc không cần ai hiểu mình.

Giữa hai người lại rơi vào im lặng.

Nhưng lần này, sự im lặng ấy không hoàn toàn giống lúc ban đầu. Không còn chỉ có tiếng gió lạnh và những âm thanh xa xôi của thành phố, mà còn có sự hiện diện của một người khác đang ngồi bên cạnh, không hỏi dồn, không ép em phải giải thích, cũng không vội vàng đưa ra những lời phán xét.

{{user}} chậm rãi ngẩng đầu, lần đầu tiên quan sát người đàn ông trước mặt một cách kỹ lưỡng.

Hắn mặc áo thun đen ôm sát thân hình rắn chắc, bên ngoài khoác một chiếc áo tối màu đã thấm hơi sương. Dưới cổ áo là những hình xăm đen kéo dài xuống xương quai xanh, chỉ để lộ một phần nhưng vẫn đủ khiến người khác nhận ra chúng không phải thứ trang trí tùy tiện.

Bên tai trái hắn đeo một chiếc khuyên bạc nhỏ, phản chiếu ánh đèn đường lạnh lẽo. Trên mu bàn tay là một vết sẹo cũ kéo dài, nằm giữa những đường gân nổi rõ và làn da sần sùi của người thường xuyên lao động bằng tay.

Gương mặt hắn góc cạnh, đường nét sắc lạnh. Đôi mắt sâu và tối, không mang vẻ hiền lành của một người thường xuyên được cuộc sống đối xử tử tế.

Hắn không giống người tốt.

Ít nhất, không giống kiểu người mà người lớn thường khuyên trẻ con nên tìm đến khi gặp khó khăn.

Hắn mang theo cảm giác nguy hiểm của một con dao được giấu trong bóng tối, thứ vũ khí chẳng cần phô bày cũng đủ khiến người khác dè chừng.

Em khẽ mấp máy môi.

“… Anh là giang hồ?”

Chu Khánh Kiên nhìn em vài giây.

“Ừ.”

Một tiếng đáp ngắn gọn.

Không phủ nhận, cũng chẳng giải thích.

Đối với hắn, chuyện mình thuộc về thế giới nào vốn chẳng có gì đáng để che giấu trước một người xa lạ.

Hắn nhìn thấy vẻ ngập ngừng trong ánh mắt em, khóe môi khẽ nhếch lên thành một nụ cười nhạt.

“Người như tôi cũng chẳng tốt đẹp gì.”

Hắn nói, giọng điệu bình thản như đang kể về một chuyện không liên quan đến mình.

“Em sợ cũng đúng.”

Một chiếc xe container chạy ngang đại lộ phía xa. Ánh đèn pha quét qua mặt sông, rọi sáng cây cầu trong khoảnh khắc rồi nhanh chóng biến mất sau khúc quanh.

Chu Khánh Kiên cúi đầu nhìn chiếc đồng hồ cũ trên cổ tay.

Đã gần hai giờ sáng.

Một nữ sinh mặc đồng phục xuất hiện ở nơi vắng vẻ như thế này vào giờ này vốn đã đủ nguy hiểm. Huống chi, nhìn sắc mặt nhợt nhạt cùng dáng vẻ kiệt sức của em, hắn biết tình trạng hiện tại của em chẳng ổn chút nào.

Hắn không biết chuyện gì đã xảy ra với em.

Nhưng hắn biết, nếu cứ tiếp tục ngồi đây giữa gió lạnh, tình hình sẽ chẳng khá hơn.

“Về nhà đi.”

Hắn lên tiếng.

Giọng nói vẫn trầm thấp, không mang vẻ ra lệnh nhưng cũng chẳng có ý định kéo dài cuộc trò chuyện.

“Giờ này lang thang ngoài đường không tốt cho em đâu.”

Hắn ngừng lại, ánh mắt lướt qua bộ đồng phục trên người em.

“Nhất là khi em còn đang đi học.”

Nghe đến đó, {{user}} bỗng bật cười.

Đó là một tiếng cười rất nhỏ, khô khốc và méo mó, chẳng có lấy một chút vui vẻ. Nó vang lên giữa đêm lạnh rồi nhanh chóng tan đi, để lại một khoảng lặng nặng nề.

“… Đi học thì sao?”

Giọng em khàn đặc.

“Con gái thì sao?”

Em cúi đầu, nhìn những ngón tay lạnh ngắt của mình.

“Đôi khi tôi chỉ muốn mình là một con vật…”

Em dừng lại, khóe môi khẽ cong lên thành một nụ cười chẳng giống cười.

“… Hoặc một cục đá cũng được.”

Ít nhất, đá không cần phải hiểu những lời nói dối.

Ít nhất, một thứ vô tri sẽ không phải cố gắng tìm kiếm tình thương từ những người luôn khiến nó đau lòng.

Chu Khánh Kiên im lặng.

Hắn nhìn em rất lâu, ánh mắt không còn vẻ hờ hững như lúc vừa xuất hiện. Điếu thuốc giữa hai ngón tay đã tắt từ bao giờ, chỉ còn một đoạn tro nhỏ bám ở đầu thuốc.

Hắn khẽ thở ra.

“Em đang không ổn.”

Lần này, giọng hắn thấp hơn.

“Đêm nay đừng ở đây nữa.”

Hắn nghiêng đầu nhìn về phía con phố xa xa, nơi vẫn còn ánh đèn sáng từ những cửa hàng mở cửa xuyên đêm.

“Gần đây có cửa hàng tiện lợi mở hai mươi bốn giờ.”

Hắn quay lại nhìn em.

“Em có thể ngồi đó đến sáng. Ít nhất, ở đó còn có người qua lại.”

Hắn không nói rằng mọi chuyện rồi sẽ ổn.

Cũng không hứa hẹn sẽ giúp em giải quyết những rắc rối mà hắn thậm chí còn chưa biết rõ.

Chu Khánh Kiên không phải người dễ dàng hứa hẹn. Hắn hiểu có những lời nói, một khi thốt ra mà không thể thực hiện, chỉ khiến người đang tuyệt vọng càng thất vọng hơn.

Vì vậy, hắn chỉ đưa ra một lựa chọn trước mắt.

Một nơi sáng đèn.

Một chỗ ngồi ấm hơn cây cầu lạnh lẽo này.

Và một khoảng thời gian để em không phải tiếp tục đối diện với tất cả mọi chuyện cùng lúc.

Gió đêm lại thổi qua.

{{user}} ngồi lặng bên thành cầu, ánh mắt dừng trên người đàn ông xa lạ trước mặt. Hắn vẫn lạnh lùng, vẫn mang vẻ bất cần và nguy hiểm, chẳng giống một người sẽ kiên nhẫn an ủi ai đó giữa đêm khuya.

Thế nhưng, kể từ khi hắn xuất hiện, em không còn cảm thấy mình hoàn toàn đơn độc như lúc đứng trên lan can nữa.

Hắn không biết em là ai.

Không biết những chuyện đã xảy ra trong căn nhà kia.

Cũng không biết vì sao em lại rơi vào tình cảnh này.

Vậy mà hắn vẫn kéo em khỏi nơi nguy hiểm, vẫn đưa cho em hũ thuốc nhỏ đã cũ, vẫn ngồi lại giữa đêm lạnh thay vì quay lưng bỏ đi như thể chưa từng nhìn thấy gì.

Có lẽ, đối với người khác, những hành động ấy chẳng đáng kể.

Nhưng đối với em, người đã quá quen với việc bị bỏ mặc, chỉ riêng việc một người xa lạ chịu dừng chân cũng đã là điều khó hiểu.

Chu Khánh Kiên dụi tắt điếu thuốc dưới mũi giày rồi đứng dậy.

Hắn đưa tay về phía em.

Bàn tay ấy rất lớn, những khớp ngón tay thô ráp, trên mu bàn tay còn hằn những vết sẹo cũ. Trông chẳng giống bàn tay có thể dịu dàng chăm sóc ai, nhưng khi hắn nắm lấy cổ tay em để giúp em đứng dậy, lực tay lại được tiết chế vừa đủ, không khiến em đau thêm.

“Ở đây không an toàn.”

Hắn nói.

“Nếu em không muốn về nhà…”

Hắn dừng lại một chút, nhìn em như thể đang chờ em quyết định có chấp nhận lời đề nghị này hay không.

“Tôi đưa em đến cửa hàng tiện lợi.”

Không phải một lời hứa sẽ bảo vệ em mãi mãi.

Cũng chẳng phải lời khẳng định rằng hắn sẽ thay đổi cuộc đời em.

Chỉ là một đề nghị đơn giản, được nói ra bằng giọng điệu bình thản của một người không quen làm việc tốt, nhưng cũng không thể hoàn toàn làm ngơ trước một người đang gặp nguy hiểm.

Hai người bắt đầu đi dọc theo con đường ven cầu.

Không ai nói thêm lời nào.

Tiếng bước chân hòa lẫn vào tiếng gió thổi qua hàng rào thép. Những cột đèn đường kéo bóng hai người dài ra trên nền xi măng ướt lạnh, lúc chồng lên nhau, lúc lại tách biệt khi họ đi qua từng khoảng sáng.

Chu Khánh Kiên bước chậm hơn thường ngày.

Hắn không thúc giục, cũng không hỏi tại sao em đi chậm. Thỉnh thoảng, hắn chỉ liếc nhìn về phía sau để chắc rằng em vẫn đang đi theo, sau đó lại quay đầu tiếp tục bước.

Một lúc lâu sau, {{user}} mới khẽ lên tiếng.

“… Anh tên gì?”

Bước chân Chu Khánh Kiên hơi khựng lại.

Hắn quay đầu nhìn em, dường như không ngờ rằng sau từng ấy chuyện, câu hỏi đầu tiên em muốn biết lại là tên của hắn.

Một giây sau, hắn bật cười nhạt.

“Chu Khánh Kiên.”

Hắn trả lời ngắn gọn, rồi lại quay người đi tiếp.

Một khoảng lặng ngắn trôi qua.

“Mà em cũng không cần nhớ làm gì.”

Hắn đút tay vào túi áo khoác, bóng lưng cao lớn dần chìm dưới ánh đèn vàng úa nơi cuối phố.

“Phiền phức lắm.”

Giọng nói ấy vẫn lạnh nhạt như cũ, chẳng có chút gì giống một lời mời gọi thân thiết.

Nhưng ít nhất, trong đêm đông dài đằng đằng ấy, Chu Khánh Kiên đã không bỏ mặc em lại trên cây cầu.

Và với một người đã quen bị thế giới quay lưng, đôi khi chỉ một lần có ai đó chịu dừng bước cũng đủ trở thành điều mà họ nhớ rất lâu.`
  }
};

CHAPTER_CONTENT['chu-khanh-kien'][5] = `CHƯƠNG 5: NGƯỜI MÀ HẮN MUỐN GIỮ LẠI

Ba tháng sau đêm trên cây cầu ấy, khu phức hợp chữ T bắt đầu xuất hiện một sự thay đổi rất nhỏ, nhỏ đến mức nếu không để ý kỹ, có lẽ sẽ chẳng ai nhận ra.

Khu đó vốn là nơi ánh đèn neon đỏ úa chiếu xuống những vũng nước đọng màu đen bẩn thỉu, là nơi tiếng chửi rủa, tiếng chai bia vỡ cùng mùi máu tanh luôn lẫn vào nhau trong không khí. Ban đêm, đám giang hồ tụ tập dưới mái hiên quán nhậu hút thuốc, đánh bài, bàn chuyện đâm chém như thể mạng người chỉ đáng giá bằng vài tờ tiền nhàu nát. Đám gái đứng đường dựa vào cột điện cười khanh khách giữa lớp son phấn rẻ tiền, những chiếc mô tô rú ga lao xuyên qua các con hẻm hẹp như thú dữ đang tru lên trong bóng tối… vậy mà giữa nơi địa ngục ấy, lại bắt đầu xuất hiện một bóng dáng hoàn toàn không thuộc về nơi này.

Một nữ sinh trung học mặc đồng phục cũ bạc màu, ngày nào cũng đứng dưới ngọn đèn đường chập chờn phía bên kia quán nhậu.

{{user}} rất ít khi bước hẳn vào bên trong, em chỉ đứng đó, ôm chiếc cặp cũ trước ngực, lặng lẽ nhìn qua lớp khói thuốc cùng tiếng người hỗn tạp để tìm một thân ảnh quen thuộc phía sau quầy bếp.

Ban đầu đám đàn em của Chu Khánh Kiên còn tưởng em chỉ vô tình đi ngang. Nhưng rồi một ngày, hai ngày, một tuần, nửa tháng… bóng dáng ấy vẫn đều đặn xuất hiện như một thói quen kỳ lạ.

“Mẹ kiếp… tao không nghĩ gu mày lại nhạt tới vậy đó.”

Một tên đàn em vừa bật nắp chai bia vừa cười khùng khục.

“Nhìn còn nhỏ hơn cả em tao nữa, bộ muốn bóc lịch hả Kiên?”

Tiếng cười vang lên ầm ĩ giữa quán nhậu đầy khói thuốc. Chu Khánh Kiên vẫn đứng trước bếp than đỏ rực, lật miếng thịt đang cháy xèo xèo trên vỉ nướng như không nghe thấy gì. Ánh lửa hắt lên gương mặt góc cạnh đầy vẻ bất cần của hắn, làm nổi bật những hình xăm đen kéo dài nơi cổ và cánh tay săn chắc.

Hắn không giải thích, cũng chưa từng phủ nhận, chỉ là từ hôm đó trở đi, mỗi tối trong quán luôn dư ra một phần cơm nóng.

Lúc thì mì xào bò, lúc là cháo thịt bằm còn nghi ngút khói. Có hôm trời lạnh, hắn còn tiện tay bỏ thêm một chai sữa nóng vào túi nylon rồi đưa cho em bằng vẻ mặt lạnh tanh.

“Ăn xong thì về nhà đi.”

Lần nào hắn cũng nói vậy, nhưng đêm nào hắn cũng chuẩn bị phần ăn riêng. Dần dần, chuyện ấy trở thành một thói quen đến mức ngay cả chính Chu Khánh Kiên cũng không nhận ra từ lúc nào. Có hôm em ngồi trên bậc thềm trước quán ăn, vừa cầm ly mì nóng vừa ngả đầu hỏi hắn những câu rất kỳ lạ.

“Nếu em để lại số điện thoại… anh sẽ giữ liên lạc với em chứ?”

Chu Khánh Kiên đang hút thuốc, nghe vậy chỉ khẽ nhíu mày.

“Con nít đừng học đòi mấy trò đó.”

“Vậy nếu em tìm anh…”

Em dừng một chút rất lâu.

“Anh sẽ ở đó chờ em sao?”

Khói thuốc trắng chậm rãi tan trong màn đêm ẩm lạnh, hắn im lặng vài giây rồi bật cười nhạt.

“Tôi không rảnh.”

Nhưng tối hôm sau, hắn vẫn nhìn thấy tin nhắn của em hiện trên màn hình điện thoại cũ kỹ.

“Em tan học rồi.”

“Hôm nay trời lạnh quá.”

“Tai em đau.”

“Em đang về nhà.”

Những câu nói vụn vặt đến vô nghĩa, vậy mà Chu Khánh Kiên chưa từng chặn số em. {{user}} luôn muốn hắn theo dõi định vị của mình, ngày nào em cũng gửi cho hắn vị trí hiện tại của mình. Em chưa từng giải thích lý do, còn hắn cũng chưa từng hỏi.

Ban đầu chỉ là thuận tay mở định vị theo dõi mà em gửi, sau đó lại dần biến thành thói quen. Mỗi lần thấy chấm đỏ nhỏ xíu kia vẫn còn di chuyển trên màn hình, hắn mới vô thức thả lỏng điếu thuốc đang cắn giữa môi.

Giống như chỉ cần biết em vẫn còn tồn tại đâu đó giữa thành phố mục nát này… là đủ, ngay cả Chu Khánh Kiên cũng không hiểu nổi mình.

Hắn lớn lên trong khu ổ chuột đầy máu và bạo lực, quen nhìn người chết hơn nhìn hoa nở. Cuộc đời hắn từ đầu đến cuối chỉ xoay quanh dao, thuốc lá, rượu mạnh cùng những trận đánh nhau thừa sống thiếu chết.

Một kẻ như hắn đáng lẽ không nên dây vào thứ sạch sẽ như em, nhưng càng muốn tránh, ánh mắt hắn lại càng vô thức tìm về phía bóng dáng gầy gò ấy dưới ngọn đèn đường, giống như một kẻ sống quá lâu trong bóng tối đột nhiên nhìn thấy ánh mặt trời, biết rõ thứ đó không thuộc về mình nhưng vẫn không khống chế được mà nhìn theo.

Cho đến đêm mưa hôm ấy.

Chu Khánh Kiên vừa kết thúc một trận ẩu đả trong hẻm phía sau quán nhậu. Mu bàn tay hắn còn dính máu, áo khoác đen ướt đẫm nước mưa và mùi tanh sắt.

Tiếng điện thoại rung lên trong túi áo, hắn cúi đầu nhìn màn hình. Chấm định vị màu đỏ vẫn sáng, nhưng vị trí hiện tại… lại nằm ở vùng ngoại ô phía Tây thành phố. Một khu nhà hoang bỏ trống đã nhiều năm.

Chân mày Chu Khánh Kiên lập tức nhíu chặt, một cảm giác lạnh buốt rất khó gọi tên bất ngờ siết mạnh lấy dạ dày hắn.

Không đúng, một nữ sinh sẽ không xuất hiện ở nơi đó giữa đêm mưa thế này. Trừ phi…

Hắn gần như lao khỏi con hẻm ngay lập tức, tiếng động cơ mô tô rú lên dữ dội, xé toạc màn mưa trắng xóa. Nước bẩn bắn tung dưới bánh xe khi hắn phóng như điên qua những con đường ngập nước. Gió lạnh tạt mạnh vào mặt đau rát, nhưng đầu óc Chu Khánh Kiên lúc ấy chỉ còn duy nhất một suy nghĩ.

Đừng xảy ra chuyện. Làm ơn… đừng để hắn đến trễ thêm lần nào nữa.

Khi đến nơi, căn nhà bỏ hoang tối om nằm im lìm giữa bãi đất trống như một cái xác chết mục nát bị bỏ quên. Tường xi măng loang lổ, cửa kính vỡ nát, nước mưa nhỏ tong tong từ mái nhà xuống nền gạch bẩn thỉu. Nhưng thứ khiến ánh mắt Chu Khánh Kiên hoàn toàn thay đổi… là tiếng cười vọng ra từ bên trong.

Tiếng cười hưng phấn và méo mó của đám thiếu niên say máu. Một giây sau, Chu Khánh Kiên đạp tung cánh cửa mục nát, tiếng “rầm” chát chúa vang vọng khắp căn nhà tối đen, và rồi mọi thứ trước mắt khiến đầu óc hắn gần như trống rỗng.

{{user}} nằm dưới nền đất lạnh ngắt, toàn thân trần trụi và run rẩy. Mái tóc dài rối tung bết vào gương mặt trắng bệch đầy nước mắt. Trên cơ thể gầy gò là vô số dấu bầm tím, vết cào cấu cùng những mảng da bị cắn đến bật máu. Giữa hai chân em là một mảng đỏ thẫm loang ra nền xi măng bẩn đến ghê người.

Còn xung quanh em… là đám thiếu niên đang cười đùa như một lũ quỷ bệnh hoạn: đứa cầm điện thoại quay phim, đứa còn đang đè lên người em, đứa khác vừa kéo khóa quần vừa cười lớn.

Khoảnh khắc ấy, Chu Khánh Kiên nghe thấy trong đầu mình có thứ gì đó đứt phựt, không còn là giận dữ nữa, mà là sát ý – một loại sát ý lạnh đến mức khiến chính hắn cũng thấy xa lạ.

Hắn bước tới rất chậm, chậm đến mức đám người kia cuối cùng cũng nhận ra có điều không ổn, nhưng trước khi bất kỳ ai kịp phản ứng, Chu Khánh Kiên đã túm tóc thằng đang đè lên người em rồi giật mạnh ra sau, tiếng đầu nó đập xuống nền xi măng vang lên khô khốc ghê người. Cùng lúc đó, hắn với tay kéo lấy tấm chăn bẩn dưới đất phủ lên người em gần như theo bản năng.

Đôi mắt em mở to, nhưng hoàn toàn trống rỗng, giống như linh hồn đã chết từ lâu rồi.

“Mày là thằng nào?! Địt mẹ -”

Tên kia còn chưa kịp gào hết câu, cú đấm đầu tiên đã giáng thẳng vào mặt hắn, âm thanh xương va chạm vang lên nặng nề giữa căn phòng lạnh ngắt.

Chu Khánh Kiên không còn nghe rõ bất cứ thứ gì nữa. Máu trong người hắn như sôi lên. Hắn lao vào đám người kia bằng thứ điên cuồng của một con thú bị chọc giận đến cực hạn. Những cú đấm nặng đến mức có thể nghe thấy tiếng răng gãy cùng tiếng xương va đập ghê rợn. Máu bắn lên cả tay áo đen của hắn, hòa lẫn với nước mưa vẫn còn nhỏ xuống từ mái tóc ướt sũng.

Tiếng la hét vang lên hỗn loạn trong căn nhà hoang. Có đứa định bỏ chạy nhưng bị hắn đạp ng sla xuống nền nhà, có đứa vừa khóc vừa van xin, có đứa bị đánh đến bất tỉnh ngay tại chỗ.

Chu Khánh Kiên lúc ấy thật sự muốn giết người, hắn muốn nghiền nát từng cái đầu trước mặt mình, muốn kéo hết lũ súc sinh đó xuống địa ngục.

Cho đến khi phía sau đột nhiên có một lực rất nhẹ ôm lấy eo hắn.

“Đừng đánh nữa…”

Giọng {{user}} khản đặc và run đến mức gần như không nghe rõ.

“Dừng lại đi…”

Chu Khánh Kiên khựng lại, hắn quay đầu nhìn em.

{{user}} đang ôm chặt tấm chăn mỏng quanh người, chân trần lê trên nền đất đầy máu. Cơ thể em run dữ dội đến mức gần như không đứng nổi, nhưng vẫn cố ôm lấy hắn từ phía sau như thể sợ hắn sẽ thật sự giết chết ai đó.

Khoảnh khắc ấy, cơn điên trong người Chu Khánh Kiên cuối cùng cũng bị kéo trở về đôi chút. Nắm tay hắn đầy máu, không biết là máu của ai.

Hắn hít mạnh một hơi rồi xoay người bế em lên. Rất nhẹ, nhẹ đến mức hắn gần như cảm thấy mình đang ôm một bộ xương lạnh ngắt.

Suốt quãng đường đến bệnh viện, Chu Khánh Kiên không nói một lời nào. {{user}} được hắn ôm chặt trong lòng ở ghế trước xe mô tô, cả người co rúm lại vì lạnh và đau. Hắn chỉ biết phóng xe thật nhanh qua màn mưa trắng xóa, bàn tay ôm em siết chặt đến mức run lên rất khẽ.

Lần đầu tiên sau rất nhiều năm… Chu Khánh Kiên cảm thấy sợ, sợ rằng em sẽ chết ngay trong lòng mình.

Phòng cấp cứu sáng đèn suốt gần bốn tiếng đồng hồ, mùi thuốc sát trùng phủ kín hành lang lạnh buốt. Chu Khánh Kiên ngồi cúi người trên ghế nhựa, hai tay dính đầy máu khô, điếu thuốc chưa châm lửa bị bóp méo trong lòng bàn tay từ lúc nào không biết.

Khi bác sĩ bước ra, vẻ mặt ông ta nặng nề đến đáng sợ.

“Bệnh nhân bị tổn thương nghiêm trọng.”

Giọng ông thấp xuống giữa hành lang vắng.

“Xuất huyết rất nhiều. Có dấu hiệu bạo lực kéo dài… thêm cả suy kiệt tinh thần nghiêm trọng.”

Chu Khánh Kiên im lặng. Rất lâu sau, bác sĩ mới hỏi:

“Anh là người nhà bệnh nhân?”

Hắn ngẩng đầu nhìn tấm kính đỏ rực của phòng cấp cứu phía xa, một lúc lâu mới khàn giọng đáp:

“… Không.”

Nhưng ngay khoảnh khắc ấy, lần đầu tiên trong đời, Chu Khánh Kiên lại nảy sinh một ý nghĩ vô cùng đáng sợ. Hắn muốn trở thành nơi để em quay về, dù chỉ một lần thôi cũng được.`;

CHAPTER_CONTENT['chu-khanh-kien'][6] = `CHƯƠNG 6: SAU CÁNH CỬA SẮT

Đêm đó, bệnh viện thành phố sáng đèn suốt tới gần rạng sáng, ánh đèn huỳnh quang lạnh trắng phủ lên hành lang dài hun hút một màu sắc tái nhợt đến ngột ngạt. Không khí nồng đặc mùi thuốc sát trùng cùng mùi máu khô lẫn trong hơi nước mùa đông khiến người ta vừa bước vào đã có cảm giác như đang bị kéo chìm xuống đáy một hồ nước lạnh buốt.

{{user}} nằm trên giường bệnh, cả người gần như không còn chút sức lực nào.

Thuốc giảm đau khiến đầu óc em lúc tỉnh lúc mê, nhưng ngay cả trong những khoảng thời gian mơ hồ ấy, cơ thể vẫn đau đến mức tưởng như từng thớ thịt đang bị xé ra khỏi xương, chỉ cần cử động nhẹ cũng đủ khiến bụng dưới co thắt dữ dội. Trên cổ tay em còn in hằn những dấu bầm tím xanh đen chưa tan, lớp băng trắng quấn quanh đùi dưới đã thấm ra vài vệt đỏ nhạt khiến người khác nhìn vào cũng thấy lạnh sống lưng.

Ngoài cửa phòng bệnh, tiếng người tranh cãi vang lên ngày càng lớn, rồi cửa bật mở, cha em lao vào đầu tiên, mùi rượu nồng nặc lập tức tràn ngập cả căn phòng. Ông ta vẫn mặc bộ quần áo nhàu nhĩ hôm trước, mái tóc rối bời, hai mắt đỏ ngầu như nhiều ngày chưa ngủ. Nhưng thứ khiến người ta khó chịu nhất không phải vẻ ngoài ấy, mà là ánh mắt hoảng loạn pha lẫn tính toán đang không ngừng đảo loạn trong hốc mắt lão.

Phía sau lão là hai cảnh sát mặc thường phục. Vừa nhìn thấy em tỉnh lại, cha em đã lập tức chỉ tay ra ngoài hành lang, giọng khản đặc vì kích động:

“Là thằng đó! Chính thằng giang hồ đó làm con gái tôi ra nông nỗi này! Con bé mới mười lăm tuổi thôi!”

Căn phòng lập tức rơi vào hỗn loạn. Mẹ em đứng phía sau bật khóc thành tiếng, bà che miệng run rẩy, cả người gầy gò gần như đứng không vững, ánh mắt nhìn em đầy tuyệt vọng và đau đớn, nhưng em chỉ nằm im, đôi mắt đen nhạt nhìn trân trân lên trần nhà trắng lạnh.

Em không giải thích, không phản bác, cũng không còn sức để tức giận nữa, bởi ngay khoảnh khắc nghe thấy cái tên “Chu Khánh Kiên”, tim em giống như bị ai đó dùng tay bóp chặt đến nghẹt thở.

…

Chu Khánh Kiên bị đưa về đồn ngay trong đêm.

Phòng thẩm vấn sáng đèn suốt nhiều giờ liền.

Khói thuốc quẩn quanh đầu ngón tay hắn, hòa lẫn với mùi máu khô còn chưa tan hết trên áo khoác đen. Trên gò má hắn vẫn còn vết bầm tím do trận đánh ở căn nhà hoang để lại, khóe môi rách một đường nhỏ đã đóng máu sẫm màu.

Viên cảnh sát đối diện hỏi hắn rất lâu.

Vì sao hắn quen em.

Vì sao em thường xuất hiện ở khu chữ T.

Vì sao một kẻ giang hồ hai mươi tuổi lại liên tục qua lại với một nữ sinh trung học.

Thậm chí ngay cả chính Chu Khánh Kiên cũng hiểu, với thân phận của mình, hắn đáng bị nghi ngờ đến mức nào.

Một kẻ lớn lên giữa xã hội đen, đánh nhau, đòi nợ thuê, dính líu đủ loại băng nhóm ngầm, loại người như hắn đứng trước pháp luật vốn đã chẳng sạch sẽ gì, nhưng từ đầu đến cuối, hắn chỉ ngồi đó, lưng hơi cúi xuống, ánh mắt tối đen dưới ánh đèn trắng lạnh ngắt.

“Tôi không làm.”

Giọng hắn khàn đặc vì hút thuốc quá nhiều.

“Tôi chỉ tới kịp lúc.”

Viên cảnh sát nhìn hắn rất lâu rồi mới tắt máy ghi âm. Dù chưa đủ bằng chứng buộc tội, nhưng theo đúng quy trình, Chu Khánh Kiên vẫn bị tạm giam để điều tra thêm.

Ba ngày sau, kết quả giám định pháp y cùng dữ liệu điện thoại của đám học sinh kia được khôi phục hoàn toàn: những đoạn video quay lén, những tin nhắn đe dọa, những lần ép buộc kéo dài suốt nhiều tháng trời, … từng thứ một bị lôi ra ánh sáng.

Cả vụ án lập tức chấn động thành phố. Nhà trường bị điều tra vì cố ý ém chuyện, một số giáo viên bị đình chỉ công tác vì biết rõ việc bắt nạt nhưng làm ngơ. Phụ huynh của nhóm học sinh kia bắt đầu tìm cách chạy án trong hoảng loạn.

Còn cha em… cuối cùng cũng bị phát hiện đã nhận tiền để che giấu toàn bộ sự việc. Ông ta bị còng tay đưa đi ngay tại khu trọ cũ kỹ trong tiếng chửi rủa hỗn loạn của hàng xóm. Ngày bị áp giải lên xe, lão vẫn còn gào thét rằng mình vô tội, nhưng chẳng còn ai tin nữa.

…

Chu Khánh Kiên được thả vào đêm thứ tư.

Đêm ấy trời mưa rất lớn, nước mưa đổ xuống mái tôn khu chữ T thành những âm thanh nặng nề như tiếng kim loại va vào nhau. Những con hẻm vốn đã tối nay càng giống một mê cung mục nát đầy mùi máu và bùn bẩn.

Ngay từ lúc bước vào khu, Chu Khánh Kiên đã biết có chuyện không ổn. Quá yên tĩnh, yên tĩnh đến mức đáng sợ, rồi viên đạn đầu tiên xé gió lao tới, âm thanh súng nổ vang lên chói tai giữa màn mưa đặc quánh. Sau đó là hàng chục bóng người từ trong bóng tối lao ra.

Đám giang hồ được thuê tới để giết hắn. Cha mẹ của những thằng đã cưỡng hiếp em không muốn vụ án bị đào sâu thêm nữa. Một kẻ như Chu Khánh Kiên còn sống ngày nào, hắn vẫn là mối đe dọa ngày đó, cho nên chúng muốn hắn biến mất.

Đêm hôm ấy, khu chữ T gần như biến thành chiến trường: tiếng súng, tiếng dao chém, tiếng người la hét, tiếng kính vỡ… máu chảy dọc theo những con hẻm ngập nước mưa thành từng vệt đỏ sẫm kéo dài giữa ánh đèn chập chờn. Chu Khánh Kiên đánh nhau như một con thú bị dồn đến tuyệt lộ. Hắn không còn cảm giác đau nữa, cũng chẳng còn phân biệt nổi đâu là máu của mình, đâu là máu người khác.

Người trong khu sau này kể rằng chưa từng thấy hắn đáng sợ đến vậy, ánh mắt hắn hôm đó giống như một người đã hoàn toàn phát điên. Khi cảnh sát cơ động cùng lực lượng quân sự được điều động tới, gần nửa khu phố đã tan hoang.

Chu Khánh Kiên bị bắt lần nữa, lần này là tội gây rối nghiêm trọng cùng tham gia bạo lực có tổ chức.

…

Trong lúc ấy, vụ án của em được chuyển thẳng lên đội trọng án cấp tỉnh. Người trực tiếp tiếp nhận là Trần Thức Hải – một cảnh sát hình sự nổi tiếng cứng rắn và liêm chính đến mức ngay cả giới tội phạm cũng phải dè chừng.

Ông ta tự mình đến bệnh viện lấy lời khai của em. Suốt buổi thẩm vấn, ông không dùng ánh mắt thương hại nhìn em lấy một lần. Chỉ lặng lẽ ghi chép từng câu trả lời bằng vẻ mặt lạnh lùng tuyệt đối. Đến cuối cùng, ông mới đặt ly nước ấm xuống cạnh giường rồi thấp giọng:

“Điều đáng xấu hổ không phải là cháu, mà là những kẻ đã làm chuyện đó.”

Đó là lần đầu tiên sau rất lâu… có người nói với em một câu như vậy.

…

Phiên tòa diễn ra vào cuối xuân năm ấy.

Hai trong số sáu kẻ cưỡng bức em, còn sống cuối cùng cũng bị kết án tù dù chưa đủ tuổi thành niên. Nghe nói khu giam giữ đặc biệt dành cho phạm nhân vị thành niên cực kỳ căm ghét loại tội phạm xâm hại tình dục.

Cha em bị tuyên án bảy năm tù vì đồng lõa che giấu tội phạm và nhận tiền bịt miệng. Ngày bị dẫn đi, lão vẫn gào chửi điên loạn như một con thú bị lôi lên đoạn đầu đài.

Mẹ em ngồi sụp xuống hành lang tòa án mà khóc đến gần như ngất lịm. Bà ôm em thật chặt, liên tục xin lỗi trong tiếng nấc nghẹn đứt quãng.

“Con phải sống… xin con… Đừng sống giống mẹ…”

Nhưng em gần như chẳng nghe lọt tai câu nào nữa, điều duy nhất em quan tâm… là Chu Khánh Kiên.

Cho đến ngày em nhìn thấy bản tin thời sự phát trên chiếc TV cũ trong phòng bệnh, hình ảnh hắn bị còng tay áp giải xuống xe cảnh sát xuất hiện giữa hàng loạt ánh đèn flash hỗn loạn.

Khoảnh khắc ấy, em gần như phát điên, dù cơ thể còn chưa hồi phục hoàn toàn, em vẫn bất chấp chạy đến trại giam.

Ngày gặp lại hắn, bầu trời âm u đến nghẹt thở. Chu Khánh Kiên ngồi phía sau lớp kính dày lạnh ngắt, áo tù màu xám rộng thùng thình trên thân thể cao lớn đầy thương tích của hắn. Gò má vẫn còn vết bầm tím chưa tan hết, khớp ngón tay quấn băng trắng, nhưng khi nhìn thấy em, hắn vẫn cười, một nụ cười rất nhạt.

Em vừa khóc vừa mắng hắn là đồ ngốc.

“Anh có biết mình có thể chết không? Anh điên rồi sao?!”

Chu Khánh Kiên im lặng nghe em khóc rất lâu, rồi hắn cúi đầu bật cười khàn đặc.

“Ừ, tôi ngốc.”

Ánh mắt hắn nhìn em xuyên qua lớp kính lạnh buốt.

“Nhưng ít nhất… hôm đó tôi không thấy hối hận.”

Chu Khánh Kiên bị tuyên án ba năm tù. Không lâu sau phiên tòa ấy, mẹ em lại biến mất lần nữa, lần này là hoàn toàn, không để lại lời nhắn, không để lại tung tích, chỉ còn lại người đàn ông từng xuất hiện cùng bà ở hành lang hôm nọ.

Ông ta tên Tạ Minh Thành, một luật sư nổi tiếng trong giới tư pháp. Ông bước vào cuộc đời em bằng dáng vẻ sạch sẽ, điềm tĩnh và ôn hòa. Ông nói sẽ bảo hộ em từ nay về sau, sẽ cho em một cuộc sống mới, một tương lai mới.`;

CHAPTER_CONTENT['chu-khanh-kien'][7] = `CHƯƠNG 7: NGƯỜI MÀ HẮN KHÔNG THỂ QUÊN

Ba năm đủ để khiến một thành phố thay đổi diện mạo, cũng đủ để biến một người từng sống giữa bóng tối thành kẻ xa lạ ngay cả với chính mình.

Những biển hiệu cũ kỹ lần lượt bị tháo xuống, nhường chỗ cho ánh đèn LED rực rỡ cùng những cửa hàng có mặt kính sáng bóng. Mấy quán bar từng nồng nặc mùi rượu rẻ tiền và thuốc lá đóng cửa hết lượt này đến lượt khác. Khu chữ T, nơi ngay cả những cảnh sát tuần đêm cũng chẳng muốn nán lại quá lâu, bị san bằng một phần để nhường đất cho trung tâm thương mại và những dãy chung cư mới xây.

Người ta gọi nơi ấy là khu tái phát triển phía Tây.

Những biển hiệu cũ kỹ bị tháo xuống thay bằng ánh đèn LED chói mắt. Những quán bar bốc mùi rượu rẻ tiền năm nào lần lượt đóng cửa. Khu chữ T từng là nơi ngay cả cảnh sát tuần đêm cũng không muốn bén mảng tới, giờ đây đã bị san bằng gần nửa để xây trung tâm thương mại cùng chung cư mới. Người ta bắt đầu gọi nơi ấy là “khu tái phát triển phía Tây”, như thể chỉ cần đổi một cái tên đẹp hơn là có thể xóa sạch máu cùng những năm tháng mục nát từng ngấm trong từng khe tường nơi đó.

Nhưng có những thứ, dù thời gian trôi qua bao lâu cũng không thể thật sự biến mất.

Chẳng hạn như ký ức về một người, về một ánh mắt từng kéo em từ bên kia lan can cầu lạnh buốt trở về nhân gian.

Ba năm, {{user}} đã mười tám tuổi.

Không còn là cô bé gầy gò co ro trong bộ đồng phục bạc màu ngày ấy nữa. Em chuyển tới một thành phố khác để học đại học, đổi tên, đổi hộ khẩu, thay toàn bộ giấy tờ cá nhân. Người đàn ông kia – vị luật sư năm ấy đã âm thầm sắp xếp tất cả. Ông ta chưa bao giờ ép em gọi mình là gì, cũng không cố bước sâu vào cuộc sống của em. Ông chỉ đứng ở một khoảng cách vừa đủ, giống một cái bóng lặng lẽ phía sau lưng, bảo đảm em có tiền học, có nơi ở, có một cuộc đời mới đủ sạch sẽ để quá khứ không thể dễ dàng lần theo.

Ông ta giữ lời, ông thật sự cho em một cuộc sống mới, chỉ là không ai biết, mỗi lần đứng trước gương nhìn khuôn mặt của chính mình, {{user}} vẫn có cảm giác xa lạ như đang nhìn một người khác.

Em tập cười.

Tập nói chuyện bình thường.

Tập đi ngang qua đám đông mà không còn giật mình khi nghe tiếng đàn ông cười lớn phía sau.

Tập ngủ mà không khóa cửa phòng ba lần liên tục.

Tập sống như một người bình thường.

Nhưng đôi khi giữa đêm khuya tỉnh giấc, em vẫn vô thức mở điện thoại, nhìn vào dãy số cũ đã sớm không còn liên lạc được nữa.

Chu Khánh Kiên – cái tên ấy giống một vết sẹo đã lành ngoài da nhưng vẫn âm ỉ đau sâu bên dưới xương thịt.

Ba năm qua, em từng đi thăm hắn thường xuyên.

Nhà giam luôn có một mùi rất lạnh – mùi sắt gỉ, mùi xi măng ẩm cùng thứ không khí tù túng khiến người khác khó thở. Mỗi lần nhìn thấy hắn mặc đồng phục phạm nhân bước ra phía sau tấm kính dày, trái tim em đều đau đến mức gần như không dám hít thở.

Hắn gầy hơn trước, mái tóc húi ngắn hơn, những hình xăm trên cổ tay thấp thoáng dưới tay áo xám bạc, chỉ có đôi mắt là vẫn vậy: sâu, tối và bình tĩnh đến đáng sợ.

Hắn rất ít khi hỏi về em. Đa phần chỉ ngồi lặng im nghe em nói chuyện trường lớp, nghe em kể hôm nay trời thế nào, ký túc xá ra sao, giáo sư khó tính đến mức nào. Có đôi khi hắn sẽ châm thuốc, lặng lẽ nhìn em qua làn khói trắng rồi thấp giọng bảo:

“Đừng quay lại khu đó nữa, đừng nhớ mấy chuyện cũ, cứ sống bình thường đi.”

Nhưng chính hắn lại là người mãi mãi bị nhốt trong quá khứ. Ngày Chu Khánh Kiên ra tù, {{user}} đã bắt chuyến xe sớm nhất quay lại thành phố cũ.

Hôm ấy trời đổ mưa phùn rất qua, những hạt nước li ti phủ lên mái hiên nhà giam thành một lớp sương trắng mỏng lạnh ngắt. Em đứng trước cổng từ sáng sớm, ôm chặt chiếc ô trong tay đến mức đầu ngón tay tái nhợt, nhưng cuối cùng người bước ra chỉ là một viên cảnh sát trung niên.

Ông ta nhìn em hồi lâu rồi khẽ thở dài.

“Về đi cháu, tù nhân đã rời đi từ sớm rồi.”

Khoảnh khắc ấy, trái tim em như bị ai đó khoét rỗng. Em đứng dưới mưa rất lâu, đến mức nước mưa thấm ướt cả vai áo. Em không biết hắn đã đi đâu, cũng không biết vì sao hắn tránh mặt mình, chỉ biết rằng kể từ ngày đó, Chu Khánh Kiên giống như thật sự biến mất khỏi cuộc đời em.

Em từng quay lại khu chữ T, nhưng mọi thứ đã khác quá nhiều. Quán nhậu cũ đổi chủ, những con hẻm từng nhuốm mùi máu cùng thuốc lá giờ treo đầy đèn quảng cáo sáng choang. Đám đàn em năm xưa của hắn phần lớn đã rửa tay gác kiếm, có người mở gara sửa xe, có người bán quán ăn nhỏ, có kẻ cưới vợ sinh con rồi sống cuộc đời bình thường đến khó tin.

Cha nuôi của hắn già đi thấy rõ, ông chỉ ngồi trước cửa tiệm tạp hóa hút thuốc, nghe em hỏi xong thì im lặng rất lâu.

“Nó không muốn gặp ai đâu. Con bé à… quên nó đi.”

Nhưng nếu thật sự quên được, em đã không quay lại nơi này hết lần này tới lần khác.

Mùa xuân năm em mười chín tuổi, thành phố phía Nam đột nhiên trở lạnh.

Buổi chiều hôm ấy, bầu trời phủ một màu vàng nhạt rất buồn. Gió thổi qua khu chữ T mang theo mùi đồ nướng cùng khói xe quen thuộc của những năm cũ. {{user}} không biết vì sao mình lại quay về đây thêm lần nữa. Có lẽ chỉ là một loại cố chấp đã ăn sâu vào máu thịt.

Hoặc cũng có thể… em thật sự nhớ hắn.

Quán nhậu cũ vẫn còn mở, tấm biển đèn neon trước cửa chập chờn sáng tối như sắp hỏng. Tiếng cụng ly, tiếng cười nói cùng tiếng dầu mỡ sôi vang vọng ra tận ngoài đường.

Rồi em nhìn thấy hắn – Chu Khánh Kiên ngồi một mình ở góc quán sát cửa sổ. Hắn mặc áo sơ mi đen đơn giản, tay áo xắn lên để lộ cánh tay đầy hình xăm cũ đã phai màu theo năm tháng. Trên bàn chỉ có vài lon bia rỗng cùng gạt tàn đầy thuốc lá.

Hắn vẫn là hắn, nhưng lại không còn giống người đàn ông của ba năm trước nữa.

Những góc cạnh sắc bén nơi hắn dường như đã bị thời gian mài mòn đôi chút. Vẻ ngông cuồng cùng khí chất bất cần năm xưa lắng xuống thành một loại trầm mặc âm u. Chỉ có đôi mắt là càng lúc càng sâu, giống mặt biển đêm không nhìn thấy đáy.

Khoảnh khắc em bước vào quán, hắn gần như lập tức nhận ra em, động tác cầm lon bia khựng lại giữa không trung, ánh mắt hắn chấn động trong thoáng chốc. ngắn đến mức nếu không nhìn kỹ sẽ tưởng mình hoa mắt, rồi tất cả nhanh chóng bị hắn ép trở về vẻ bình tĩnh lạnh nhạt quen thuộc.

“Sao em ở đây?”

Giọng hắn khàn hơn trước rất nhiều.

“Em không nên tới nơi này.”

“Về đi.”

Hắn nói, âm thanh nhẹ đến mức giống đang cầu xin hơn là xua đuổi, nhưng chỉ có chính Chu Khánh Kiên mới biết, lúc nhìn thấy em ngồi xuống đối diện mình, bàn tay cầm lon bia của hắn đã run đến mức nào.

Bốn năm, hắn đã mất bốn năm để ép bản thân không tìm em. Hắn tưởng mình làm được rồi, cho đến khi em thật sự xuất hiện trước mắt.

{{user}} không trả lời, em chỉ lặng lẽ nhìn hắn thật lâu, nhìn những vết sẹo mới nơi khóe môi, nhìn quầng thâm mờ dưới mắt, nhìn dáng vẻ cô độc đến đáng sợ của người đàn ông này. Rồi rất đột ngột, em vươn tay lấy điện thoại hắn. Chu Khánh Kiên khựng lại, hắn không ngăn em. Em cúi đầu nhập dãy số của mình vào danh bạ, lưu tên rất ngắn gọn, sau đó đẩy điện thoại trở lại trước mặt hắn.

“Em sẽ lại tìm anh.”

Giọng em rất khẽ, nhưng kiên định đến mức khiến lồng ngực hắn đau nhói.

“Dù anh có trốn em thế nào đi nữa.”

Chu Khánh Kiên nhìn em rất lâu. Ngoài trời, ánh hoàng hôn cuối cùng chậm rãi chìm xuống phía sau những dãy nhà cũ kỹ. Ánh sáng màu cam đỏ phủ lên gương mặt hắn một tầng sắc tối mờ nhạt, khiến đôi mắt kia càng trở nên sâu không thấy đáy.

Một lúc lâu sau, hắn mới bật cười khàn khàn, một nụ cười vừa bất lực… vừa đau đớn.

“Con nít đúng là phiền thật.”

Nhưng lần này, hắn không bảo em biến mất nữa.`;

CHAPTER_CONTENT['chu-khanh-kien'][8] = `CHƯƠNG 8: MƯA MÁU

Xuân tàn qua mái hiên xưa cũ,
Hạ tắt trong chiều đổ mưa ngâu.
Thu nhuộm lá vàng bên khung cửa,
Đông về phủ trắng mộng thương đau.

Thời gian đôi khi giống một cơn mưa phùn kéo dài suốt nhiều năm trời. Không dữ dội đến mức khiến người ta nhận ra ngay từ đầu, nhưng lại âm thầm thấm sâu vào da thịt, đến lúc ngoảnh lại mới phát hiện mọi thứ đã mục nát từ lúc nào không biết.

Hai năm trôi qua kể từ ngày {{user}} gặp lại Chu Khánh Kiên ở quán nhậu cũ nơi khu chữ T.

Hai năm ấy, không ai trong hai người thật sự bước vào cuộc đời đối phương, nhưng cũng chẳng ai có thể rời khỏi nó.

Mối quan hệ của họ giống một sợi chỉ mỏng treo lơ lửng giữa vực sâu. Chỉ cần tiến thêm một bước sẽ là tình yêu, nhưng lùi lại cũng không còn đủ xa để gọi là người dưng. Bọn họ cứ đứng ở khoảng giữa ấy, day dứt, lặng im rồi tiếp tục dây dưa cùng nhau qua từng mùa đổi gió.

{{user}} dần trưởng thành. Cô gái năm nào co ro trong bộ đồng phục bạc màu giờ đã trở thành sinh viên đại học năm ba. Em biết trang điểm nhẹ, biết mặc váy dài màu sáng, biết mỉm cười với người khác thay vì luôn cúi đầu né tránh ánh nhìn như trước. Cuộc sống mới mà người đàn ông kia âm thầm sắp xếp cho em dần đi vào quỹ đạo ổn định. Em có bạn học, có công việc làm thêm tử tế, có căn phòng nhỏ ngập nắng mỗi buổi sáng thay vì bốn bức tường ẩm mốc chỉ toàn tiếng chửi rủa ngày xưa.

Mọi thứ dường như đều đang tốt lên, ít nhất… nhìn từ bên ngoài là như vậy.

Chỉ có Chu Khánh Kiên biết, đôi khi giữa đêm khuya em vẫn vô thức gọi điện cho hắn chỉ để nghe tiếng hắn trả lời một câu “ừ” rất ngắn ngủi rồi mới yên tâm ngủ tiếp. Em vẫn giữ thói quen gửi định vị cho hắn mỗi lần đi xa, dù giờ đây chẳng còn ai theo dõi hay đe dọa em nữa. Có những hôm tan làm muộn, em sẽ đứng dưới lầu khu trọ của hắn hàng giờ chỉ để ép hắn xuống ăn cùng mình một bữa cơm.

Mà hắn chưa từng thật sự từ chối em.

Chu Khánh Kiên vẫn sống ở khu chữ T.

Hắn đổi nghề sau khi ra tù, không còn dính quá sâu vào những cuộc thanh toán đẫm máu như trước, cũng không còn là tên điên nổi tiếng liều mạng nhất khu nữa. Hắn mở một quán ăn cùng vài người anh em cũ ở cuối con hẻm. Cuộc sống bây giờ giống mặt nước đục ngầu sau cơn bão lớn – không còn cuộn sóng dữ dội, nhưng cũng chẳng bao giờ thật sự trong veo.

Có điều duy nhất không thay đổi… là cách hắn nhìn em, giống như nhìn một thứ ánh sáng quá sạch sẽ xuất hiện sai chỗ trong đời mình.

Khu chữ T vào mùa mưa luôn rất lạnh. Những con hẻm chật hẹp quanh năm không thấy mặt trời bị nước mưa ngâm đến bốc lên mùi rỉ sắt cùng xi măng ẩm mốc. Mỗi tối em tới tìm hắn, đám đàn em trong quán nhậu đều sẽ cười cợt trêu chọc.

“Ê Kiên, con bé sinh viên kia lại tới nữa kìa.”

“Mẹ, nhìn nó ngoan vậy mà dính trúng thằng như mày cũng lạ thật.”

Có thằng còn cười lớn hơn:

“Không tính cưới hả? Hay tính làm cha già nuôi con gái người ta cả đời?”

Chu Khánh Kiên thường chỉ im lặng hút thuốc, ánh lửa đỏ lập lòe giữa màn đêm phủ lên gương mặt hắn một tầng bóng tối nhàn nhạt, rồi hắn sẽ thấp giọng chửi một câu rất khẽ:

“Câm miệng.”

Nhưng ánh mắt lại vô thức nhìn về phía em đứng bên kia đường.

{{user}} rất thích đứng dưới ngọn đèn cũ đối diện nhìn hắn, ánh đèn vàng nhạt phủ lên mái tóc cùng bờ vai em một tầng sáng dịu dàng đến mức lạc lõng giữa khu phố đầy mùi dầu nhớt cùng khói thuốc này. Có đôi khi Chu Khánh Kiên đang nướng thịt giữa chừng cũng sẽ vô thức ngẩng đầu nhìn sang, rồi thất thần vài giây.

Hắn chưa từng nói cho em biết… mỗi lần nhìn thấy em đứng ở đó, hắn đều có cảm giác như đang nhìn một cánh hoa trắng bị gió thổi lạc vào bãi bùn lầy, đẹp đến mức khiến người ta vừa muốn chạm vào… vừa sợ làm bẩn nó.

Hắn không cho em tới nhà mình, dù em từng năn nỉ rất lâu. Căn phòng hắn ở nằm sâu cuối khu lao động cũ, trần thấp, tường loang lổ nước mưa cùng mùi thuốc lá ngấm vào từng khe cửa. Chu Khánh Kiên luôn cảm thấy nơi đó quá dơ bẩn để em bước vào.

Có lần em giận đến đỏ cả mắt.

“Anh coi em là người ngoài sao?”

Hắn đứng tựa cửa quán rất lâu, cuối cùng chỉ thấp giọng:

“Không phải. Vì nơi đó không hợp với em.”

Em không hiểu, hoặc có lẽ em hiểu, chỉ là không chấp nhận. Chu Khánh Kiên cũng không cho em giới thiệu hắn với bạn bè trường đại học. Mỗi lần em vô thức nhắc tới chuyện đó, hắn đều lập tức đổi chủ đề.

Hắn biết rõ bản thân mình là loại người gì, một kẻ từng ngồi tù, từng sống bằng đánh nhau cùng máu me, từng lớn lên giữa súng đạn và bạo lực, hắn thậm chí còn chẳng có nổi một quá khứ sạch sẽ để kể cho em nghe.

Có lần đêm khuya, khi quán đã đóng cửa, đám bạn cũ ngồi uống bia cùng hắn dưới mái hiên đầy tiếng mưa rơi. Một tên đàn em nhìn hắn hồi lâu rồi bật cười:

“Mày yêu con bé đó tới vậy, sao không nói?”

Chu Khánh Kiên rít một hơi thuốc rất sâu, khói trắng chậm rãi tan vào màn mưa trước mặt, hắn im lặng rất lâu mới khàn giọng đáp:

“Tao không xứng.”

Bốn chữ rất nhẹ, nhẹ đến mức gần như bị tiếng mưa nuốt mất, nhưng chỉ người thật sự yêu đến tận cùng mới hiểu… cảm giác “không xứng” đôi khi còn đau hơn cả việc không được yêu.

Chu Khánh Kiên từng nghĩ rất nhiều. Hắn nghĩ về tương lai của em, nghĩ tới ngày em tốt nghiệp, tìm được công việc ổn định, quen một người đàn ông sạch sẽ, tử tế, có gia đình đàng hoàng, có thể đứng dưới ánh mặt trời nắm tay em mà không cần cúi đầu né tránh ánh mắt người khác.

Người đó sẽ không có tiền án, không có hình xăm kín lưng, không sống ở khu ổ chuột đầy máu cùng bạo lực như hắn.

Người đó sẽ đường hoàng đứng cạnh em giữa ban ngày.

Còn hắn thì không thể. Cho nên, hắn cứ lùi từng chút một, lặng lẽ như một cái bóng. Hắn nghĩ, thôi thì cứ như bây giờ cũng được, ít nhất em vẫn còn cười, ít nhất em vẫn còn sống tốt, chỉ cần đến ngày em thật sự yêu ai khác, hắn sẽ tự biến mất khỏi cuộc đời em, giống như chưa từng tồn tại.

Dù sao thì những kẻ như hắn vốn sinh ra để chìm xuống bùn lầy, còn em… đáng lẽ phải thuộc về nơi có ánh mặt trời.`;

CHAPTER_CONTENT['chu-khanh-kien'][9] = `CHƯƠNG 9: KHÔNG BIẾT KHI NÀO VỀ

Đêm đó, thành phố gần như bị nhấn chìm dưới một cơn mưa chưa từng có.

Mưa lớn đến mức bầu trời và mặt đất như hòa làm một. Những con đường ngập nước phản chiếu ánh đèn xe méo mó như những vệt màu chảy dài trong bóng tối. Gió rít qua các tòa cao ốc tạo thành âm thanh trầm đục giống tiếng ai đó đang khóc nghẹn trong cổ họng.

{{user}} tan học rất muộn, lớp đàn hôm nay kéo dài hơn bình thường vì buổi diễn cuối kỳ sắp tới. Khi bước ra khỏi học viện âm nhạc, đồng hồ đã gần mười một giờ đêm. Em ôm chặt tập bản nhạc trước ngực, đứng dưới mái che của trạm xe buýt cũ nằm bên đường lớn, nơi Chu Khánh Kiên vẫn thường tới đón em mỗi khi trời mưa.

Mưa tạt xiên qua mái hiên lạnh buốt, đèn đường phía trên đầu lúc sáng lúc tắt, ánh sáng vàng nhợt nhạt hắt xuống mặt đường loang lổ nước mưa như một giấc mộng cũ kỹ sắp tan.

Em cúi đầu nhìn điện thoại, tin nhắn cuối cùng của hắn gửi cách đây mười phút.

“Đợi tôi chút.”

Chỉ bốn chữ rất ngắn, nhưng suốt nhiều năm qua, chỉ cần nhìn thấy chúng, em luôn có cảm giác an tâm kỳ lạ, giống như dù thế giới này có mục nát đến mức nào, vẫn sẽ có một người vượt qua mưa gió để đến tìm em.

Chiếc xe buýt cuối cùng đã rời đi từ lâu, con đường dần vắng tanh, tiếng mưa rơi phủ kín mọi âm thanh. Rồi ngay khoảnh khắc em cúi đầu kéo cao cổ áo tránh gió lạnh, phía sau đột nhiên xuất hiện tiếng bước chân rất khẽ.

Chưa kịp quay lại – một bàn tay lập tức bịt chặt miệng em từ phía sau, mùi thuốc mê nồng gắt xộc thẳng vào khoang mũi. {{user}} hoảng loạn giãy giụa theo bản năng, nhưng sức lực rất nhanh bị rút cạn. Tầm nhìn em bắt đầu méo mó, ánh đèn đường trước mặt loang ra thành những quầng sáng mờ nhòe giữa màn mưa trắng xóa.

Trước khi ý thức hoàn toàn chìm xuống, em chỉ kịp nghe thấy tiếng mưa thật lớn… và một giọng đàn ông khàn đục vang lên sát bên tai.

“Con gái ngoan… cuối cùng tao cũng tìm được mày.”

Sau đó… không còn nhớ gì nữa.

***

Chu Khánh Kiên tới trễ năm phút.

Chỉ năm phút, nhưng có những chuyện trong đời, chỉ cần chậm một bước thôi cũng đủ hủy hoại tất cả.

Hắn dừng xe trước trạm chờ quen thuộc, mái tóc cùng áo khoác đã ướt sũng vì mưa. Ánh mắt hắn gần như lập tức quét khắp con đường tối om phía trước: không có ai. Chiếc ô em thường cầm mỗi ngày cũng không còn ở đó.

Chu Khánh Kiên khựng lại, một cảm giác lạnh buốt đột ngột bò dọc sống lưng hắn.

Mưa vẫn đang rơi rất lớn, nhưng trực giác của những kẻ từng sống quá lâu trong bóng tối luôn nhạy bén đến đáng sợ. Chỉ trong vài giây ngắn ngủi, sắc mặt hắn đã thay đổi hoàn toàn.

Hắn lập tức rút điện thoại, bàn tay cầm máy siết chặt đến mức nổi gân xanh.

Từ chuyện năm xưa, {{user}} vẫn luôn bật định vị cho hắn, thói quen ấy chưa từng thay đổi.

Màn hình sáng lên giữa màn đêm lạnh lẽo, chấm đỏ nhỏ bé đang di chuyển rất chậm về phía ngoại ô phía tây thành phố, một khu công nghiệp bỏ hoang. Khoảnh khắc ấy, đầu óc Chu Khánh Kiên gần như trống rỗng.

Ký ức cũ như một lưỡi dao rỉ sét đâm thẳng vào lồng ngực hắn, căn nhà hoang năm đó, mùi máu, tiếng khóc và cơ thể gầy gò run rẩy của em dưới nền xi măng lạnh ngắt.

Chu Khánh Kiên gần như không còn thở nổi.

“Đừng…”

Hắn siết mạnh tay ga, tiếng động cơ mô tô gầm lên chói tai giữa màn mưa dữ dội, nước bắn tung tóe dưới bánh xe khi hắn phóng như điên qua những con đường ngập nước, gió lạnh quất mạnh vào mặt đau rát, nhưng hắn không cảm thấy gì nữa.

Trong đầu hắn lúc ấy chỉ còn một suy nghĩ duy nhất: đừng xảy ra chuyện, làm ơn… đừng để hắn tới trễ lần nữa.

***

Nhà máy bỏ hoang nằm giữa khu đất trống hoang tàn phía ngoại ô giống một cái xác chết khổng lồ bị thời gian bỏ quên. Cửa sắt gỉ sét đung đưa theo gió, những ô cửa kính vỡ nát để mặc nước mưa cùng tiếng sấm tràn vào bên trong.

Chu Khánh Kiên đạp mạnh cửa bước vào, tiếng kim loại va đập vang lên chát chúa giữa không gian tối om, rồi hắn nhìn thấy… khoảnh khắc ấy, cả thế giới như bị sét đánh nát.

{{user}} nằm trên nền đất lạnh ngắt giữa nhà xưởng bỏ hoang, quần áo bị xé ném tán loạn quanh người, làn da trắng tái hằn đầy những vết bầm tím do bị giữ chặt trong lúc mê man. Cổ tay em đỏ ửng vì dây trói, mái tóc dài rối tung dính lên gương mặt tái nhợt không còn chút máu.

Em bất động, giống một con búp bê đã vỡ. Còn phía trước em… là cha của em.

Người đàn ông ấy đứng quay lưng về phía cửa, hơi thở nặng nề vì rượu, đôi tay run rẩy đang kéo khóa thắt lưng. Hắn ta không nhận ra Chu Khánh Kiên đã bước vào, cho đến khi tiếng giày chậm rãi vang lên giữa nền bê tông ngập nước.

Người đàn ông kia quay đầu lại, khoảnh khắc nhìn thấy Chu Khánh Kiên, sắc mặt lão lập tức trắng bệch.

“Thằng –”

Lão chưa kịp nói hết câu, một cú đấm đã giáng thẳng vào mặt, âm thanh xương va chạm vang lên nặng nề giữa tiếng sấm.

Người đàn ông ngã đập mạnh xuống nền đất, Chu Khánh Kiên bước tới từng bước một, rất chậm. Mưa tạt qua cửa sổ vỡ làm ướt sũng mái tóc hắn, ánh chớp lóe lên rồi vụt tắt, phủ lên gương mặt hắn một tầng sáng trắng lạnh lẽo đến đáng sợ.

Trong đôi mắt ấy lúc này… không còn thứ gì giống con người nữa.

Người đàn ông dưới đất run rẩy bò lùi lại.

“Không… không phải tao… Nó…”

Lời còn chưa dứt, Chu Khánh Kiên đã túm cổ áo lão kéo mạnh lên.

“Ông không xứng gọi tên em ấy.”

Giọng hắn rất thấp, khàn đặc, lạnh đến mức khiến người khác phát run.

Bên ngoài, sấm nổ dữ dội. Cơn mưa như muốn nuốt chửng cả thành phố, không ai biết đêm đó trong nhà máy bỏ hoang ấy đã xảy ra chuyện gì. Chỉ biết khi cảnh sát tới nơi, người đàn ông kia đã nằm bất động giữa nền máu lạnh ngắt, một nhát dao chí mạng xuyên thẳng tim. Còn Chu Khánh Kiên… hắn ngồi dựa vào bức tường phía sau, cả người đầy máu và nước mưa, hai tay ôm chặt {{user}} đang hôn mê vào lòng như ôm lấy thứ cuối cùng còn sót lại của đời mình.

***

Khi {{user}} tỉnh lại, thứ đầu tiên em nhìn thấy là ánh đèn trắng lạnh lẽo của bệnh viện, mùi thuốc sát trùng quen thuộc khiến dạ dày em co thắt theo bản năng. Ngoài cửa sổ trời vẫn còn mưa, tiếng nước nhỏ xuống mái hiên đều đều như tiếng đồng hồ đếm ngược của số phận.

Người ngồi cạnh giường bệnh là Trần Thức Hải – vị cảnh sát hình sự năm xưa từng phụ trách vụ án của em. Ông già hơn trước rất nhiều, khóe mắt đã xuất hiện thêm nếp nhăn, nhưng ánh nhìn vẫn nghiêm nghị và trầm ổn như cũ. Khi thấy em tỉnh, ông im lặng rất lâu mới chậm rãi mở miệng:

“Có chuyện này… chú cần cháu bình tĩnh.”

{{user}} nhìn ông, một dự cảm lạnh buốt dần siết lấy tim em. Trần Thức Hải tháo kính xuống, giọng ông trầm thấp đến nặng nề.

“Người bắt cóc cháu… là cha cháu.”

Không khí trong phòng bệnh lập tức đông cứng.

“Còn Chu Khánh Kiên…”

Ông dừng vài giây.

“… đã giết ông ta.”

Thế giới trước mắt em như vỡ vụn trong khoảnh khắc ấy.

***

Ba ngày trước phiên tòa, {{user}} mới được gặp Chu Khánh Kiên. Phòng thăm gặp của trại giam lạnh đến mức khiến đầu ngón tay tê dại, ở giữa hai người là một lớp kính dày trong suốt.

Chu Khánh Kiên gầy đi rất nhiều, mái tóc bị cắt ngắn, gương mặt hốc hác hơn trước, nơi khóe môi còn vết thương chưa lành hẳn. Bộ đồ tù nhân màu xám khiến hắn trông xa lạ đến mức đau lòng, nhưng ánh mắt hắn nhìn em vẫn giống hệt ngày xưa.

{{user}} run rẩy áp tay lên mặt kính, đầu ngón tay em chậm rãi men theo đường nét gương mặt hắn qua lớp kính lạnh buốt.

“Anh đang làm gì vậy…”

Giọng em vỡ vụn.

“Sao anh lại làm thế…”

Chu Khánh Kiên nhìn em rất lâu, đôi mắt hắn đỏ hoe, rồi hắn khẽ cười – nụ cười rất nhạt, mệt mỏi đến tận cùng.

“Làm những gì tôi thấy nên làm.”

Hắn chậm rãi giơ tay áp lên phía bên kia lớp kính, lòng bàn tay hai người không thể chạm vào nhau, cách nhau một lớp thủy tinh lạnh lẽo.

“Sau này sống cho tốt… đừng tìm tôi nữa.”

Nói xong, hắn đứng dậy rời đi, không quay đầu lại. Nhưng {{user}} không biết rằng ngay khoảnh khắc cánh cửa sắt đóng sầm phía sau lưng, Chu Khánh Kiên đã cúi gập người xuống hành lang tối om, hai mắt đỏ ngầu đến đáng sợ, nước mắt hắn cuối cùng vẫn rơi.

“Xin lỗi…”

Giọng hắn khàn đặc đến gần như không thành tiếng.

“Tôi thất hứa rồi.”

***

Phiên tòa diễn ra vào đầu đông, bầu trời xám xịt phủ đầy mưa lạnh.

Tạ Minh Thành đứng ra làm luật sư bào chữa cho Chu Khánh Kiên. Với chứng cứ thu thập được cùng hồ sơ tâm lý kéo dài nhiều năm của {{user}}, vụ án cuối cùng được quy vào hành vi giết người trong trạng thái phòng vệ vượt quá giới hạn cùng tác động tâm lý cực đoan.

Chu Khánh Kiên lĩnh án mười năm tù. Khi bị áp giải đi ngang qua em, hắn không nhìn em lấy một lần, giống như cố ép bản thân phải đoạn tuyệt hoàn toàn. Nhưng chỉ có hắn mới biết… mỗi đêm sau song sắt lạnh ngắt, khi ánh đèn trong phòng giam tắt xuống, hắn đều nhớ em đến phát điên.

Hắn nhớ dáng em đứng dưới ngọn đèn vàng nơi khu chữ T, nhớ giọng em gọi tên hắn giữa những ngày mưa, nhớ cả đôi mắt từng kéo hắn ra khỏi vực sâu năm nào. Có đôi khi trong mơ, hắn vẫn thấy em ngồi cạnh mình dưới trời chiều mùa xuân.

Còn hắn… chỉ lặng lẽ đứng phía sau như một cái bóng, âm thầm làm vệ sĩ cho cuộc đời em.

– Hết –`;

const ChapterStoriesSectionBase: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<ChapterCharacter | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem | null>(null);
  const [progress, setProgress] = useState(0);
  const chapterContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedChapter === null) {
      setProgress(0);
      return;
    }
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setProgress(Math.round(scrollPercent));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedChapter]);

  // When chapter changes, automatically scroll to the top of the chapter content
  React.useEffect(() => {
    if (selectedChapter) {
      if (chapterContainerRef.current) {
        chapterContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [selectedChapter?.id]);

  if (selectedChapter !== null && selectedCharacter) {
    const content = CHAPTER_CONTENT[selectedCharacter.id]?.[selectedChapter.id];
    const firstLine = content ? content.trim().split('\n')[0] : '';
    const chapterSubtitle = firstLine.includes(':')
      ? firstLine.substring(firstLine.indexOf(':') + 1).trim()
      : '';

    const chapters = selectedCharacter.chapters;
    const currentIndex = chapters.findIndex((chap) => chap.id === selectedChapter.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex >= 0 && currentIndex < chapters.length - 1;
    const prevChapter = hasPrev ? chapters[currentIndex - 1] : null;
    const nextChapter = hasNext ? chapters[currentIndex + 1] : null;

    const handleNavigateChapter = (targetChapter: ChapterItem) => {
      setSelectedChapter(targetChapter);
      if (chapterContainerRef.current) {
        chapterContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return (
      <div className="relative" ref={chapterContainerRef}>
        <div className="fixed top-0 left-0 w-full h-1 bg-purple-900/50 z-50">
          <div className="h-full bg-purple-300 transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
        <div className="bg-[#240a3d]/90 rounded-2xl p-6 border border-purple-500/30 shadow-xl text-purple-100 mt-4">
          <button
            onClick={() => setSelectedChapter(null)}
            className="flex items-center gap-2 text-pink-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách chương: {selectedCharacter.name}</span>
          </button>
          
          <h2 className="text-2xl font-bold font-serif text-white mb-6 text-center">
            {selectedChapter.label.toUpperCase()}{chapterSubtitle ? `: ${chapterSubtitle}` : ''}
          </h2>

          <div className="prose prose-purple prose-invert max-w-none">
            {content ? (
              <div className="whitespace-pre-line text-base leading-relaxed text-purple-100">
                {content.split('\n').slice(1).join('\n')}
              </div>
            ) : (
              <p className="text-purple-400 italic">Nội dung chương này đang được cập nhật...</p>
            )}
          </div>

          {/* Điều hướng chương: ← Chương trước | Chương sau → */}
          <div className="mt-10 pt-6 border-t border-purple-500/30 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => prevChapter && handleNavigateChapter(prevChapter)}
              className={`flex items-center justify-center px-4 sm:px-6 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 select-none ${
                hasPrev
                  ? 'bg-[#1c0630]/90 text-purple-100 border-purple-500/40 hover:bg-purple-800/50 hover:text-white hover:border-pink-400 active:scale-95 cursor-pointer shadow-md'
                  : 'bg-purple-950/20 text-purple-400/30 border-purple-900/20 cursor-not-allowed select-none opacity-50'
              }`}
              title={prevChapter ? `Mở ${prevChapter.label}` : 'Đây là chương đầu tiên'}
            >
              ← Chương trước
            </button>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => nextChapter && handleNavigateChapter(nextChapter)}
              className={`flex items-center justify-center px-4 sm:px-6 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 select-none ${
                hasNext
                  ? 'bg-[#1c0630]/90 text-purple-100 border-purple-500/40 hover:bg-purple-800/50 hover:text-white hover:border-pink-400 active:scale-95 cursor-pointer shadow-md'
                  : 'bg-purple-950/20 text-purple-400/30 border-purple-900/20 cursor-not-allowed select-none opacity-50'
              }`}
              title={nextChapter ? `Mở ${nextChapter.label}` : 'Đây là chương cuối cùng'}
            >
              Chương sau →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCharacter) {
    return (
      <div className="bg-[#240a3d]/90 rounded-2xl p-6 border border-purple-500/30 shadow-xl text-purple-100">
        <button
          onClick={() => setSelectedCharacter(null)}
          className="flex items-center gap-2 text-pink-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại danh sách nhân vật</span>
        </button>
        
        <h2 className="text-2xl font-bold font-serif text-white mb-6 text-center">
          Danh sách chương: {selectedCharacter.name}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedCharacter.chapters.map((chap) => (
            <div 
              key={chap.id} 
              onClick={() => setSelectedChapter(chap)}
              className="bg-[#1c0630]/90 p-4 rounded-xl border border-purple-500/30 hover:border-pink-400 transition-colors cursor-pointer text-center font-medium hover:bg-purple-900/40"
            >
              {chap.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-serif text-white text-center">Cốt Truyện Theo Chương</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHARACTERS.map((char) => (
          <div
            key={char.id}
            onClick={() => setSelectedCharacter(char)}
            className="bg-[#240a3d]/90 rounded-2xl p-6 border border-purple-500/30 shadow-xl text-purple-100 cursor-pointer hover:border-pink-400 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-bold font-serif text-white">{char.name}</h3>
              <div className="flex flex-wrap gap-2">
                {char.hashtags.map((tag, i) => (
                  <span key={i} className="text-[11px] bg-[#36104f]/90 text-pink-200 px-2 py-0.5 rounded-full border border-purple-400/40">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-purple-200/90 font-serif italic">"{char.slogan}"</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-semibold text-pink-300">
              <span>{char.id === 'chu-khanh-tri' ? '14 Chương (14.1 & 14.2)' : `${char.chapters.length} Chương`}</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChapterStoriesSection = React.memo(ChapterStoriesSectionBase);
