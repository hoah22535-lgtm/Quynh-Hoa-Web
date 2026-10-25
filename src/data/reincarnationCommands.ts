import { ReincarnationCommand } from '../types';

/**
 * =====================================================================
 * BỘ SƯỜN DỮ LIỆU LỆNH CHUYỂN SINH — QUỲNH HOA STORY STUDIO
 * =====================================================================
 * Hướng dẫn dành cho Chủ Website:
 * - Để thêm một mục mới: Sao chép toàn bộ một khối { ... }, đổi id, title, description, content.
 * - Để sửa nội dung: Chỉnh sửa trực tiếp title, description hoặc content của mục đó.
 * - Để xóa một mục: Xóa khối dữ liệu tương ứng.
 * 
 * Quy ước:
 * - Các giá trị nằm trong dấu ngoặc vuông [...] là vị trí giữ chỗ; giao diện sẽ tự động
 *   hiển thị sạch sẽ và trang nhã đến độc giả.
 * - Chỉ những mục có nội dung thực tế mới được hiển thị trên website.
 */
export const reincarnationCommands: ReincarnationCommand[] = [
  {
    id: "lenh-01",
    title: "[Lệnh chuyển sinh nhân vật]",
    description: "[Chuyển sinh khi: Char đã vượt quá 200k – 300k tokens, lag hoặc nhân vật bị OOC. Chuyển sinh là chuyển sang bảng mới để giảm bớt gánh nặng của cuộc trò chuyện dài mà không làm mất đi tính chất nhân vật và giữ được mạch truyện chính.]",
    content: `
[B1: Dán lệnh dưới đây vào khung chat hiện tại của bạn:

DIRECTIVE: PROJECT ETERNAL CHRONICLE

Comprehensive Narrative Reconstruction & Continuity Preservation Protocol

MISSION OBJECTIVE:
Examine all historical conversation records, roleplay transcripts, character interactions, and established narrative data that are actually accessible. Reconstruct them into a highly detailed, continuity-preserving reference document that allows a future AI session to resume the ongoing story without losing essential events, character identities, emotional development, unresolved conflicts, or established mechanics.
This is a historical reconstruction task, not a request to conclude, rewrite, or restart the narrative.

FUNDAMENTAL OPERATING PRINCIPLES
* Historical Accuracy: Record only information supported by accessible conversation history. Never fabricate events, dialogue, character traits, dates, promises, possessions, or relationships to fill missing information.
* Chronological Integrity: Preserve the original sequence of events and distinguish the time an event occurred from the time it was discussed.
* Psychological Continuity: Track how experiences influence a character’s subsequent decisions, emotional defenses, trust, hostility, attachment, and motivations.
* Narrative Persistence: Treat the story as ongoing unless the source explicitly establishes its conclusion.
* Information Provenance: Clearly distinguish confirmed facts, reasonable interpretations, conflicting accounts, and unknown information.
* Context Awareness: Do not claim to have examined inaccessible conversations, hidden records, or unavailable memories. If the available material is incomplete, explicitly document the limitation.
* Compression Without Distortion: Reduce redundancy while preserving details that may influence future plot developments or character behavior.

⸻

SECTION I — WORLD CONTINUITY & SYSTEM EVOLUTION

1.1 Current World Configuration
Document the latest verifiable state of the fictional universe, focusing exclusively on developments that occurred during the recorded narrative rather than repeating unchanged background information.
Include:
* The latest established in-universe date, time, season, era, or elapsed-time marker.
* The current geographical location and relevant surrounding conditions.
* The present status of major factions, organizations, territories, governments, and alliances.
* Any documented changes in warfare, political control, social order, environmental conditions, or large-scale threats.
* Major consequences of previous events that continue to influence the world.
If the current time, location, or faction status cannot be established, label it UNCONFIRMED rather than inventing an answer.

1.2 Evolving Rules & Exceptional Mechanics
Identify rules, systems, or operational principles that emerged during the story and were not already established in the original setting.
Record:
* Newly demonstrated abilities, limitations, costs, or conditions.
* Changes to previously established rules.
* Exceptional circumstances, loopholes, or unusual interactions between systems.
* Newly introduced survival rules, political arrangements, contracts, technologies, supernatural principles, or game mechanics.
* Conditions under which each rule applies and any known exceptions.
For every entry, indicate whether the rule was explicitly established, repeatedly demonstrated, or merely inferred.
Do not relabel an existing rule as a new discovery without evidence of an actual change.

⸻

SECTION II — MASTER TIMELINE & NARRATIVE MEMORY ARCHIVE

2.1 Origin Event: Establishing the Narrative’s Starting Point
Locate the earliest accessible event that directly initiated the current storyline, conflict, mission, or relationship.
Document:
* The initiating circumstances.
* The characters involved and their original relationship.
* The immediate cause of the incident.
* The first consequential decision, confrontation, discovery, or emotional reaction.
* The exact in-universe temporal marker, if available.
* The original motivations and expectations of the involved characters.
Do not confuse the earliest surviving transcript with the actual beginning of the story unless the available evidence supports that conclusion.

2.2 Sequential Event Reconstruction
Reconstruct the narrative as an ordered series of individual events. Do not compress multiple consequential scenes into vague chapter summaries.
Assign each event a timestamp or chronological identifier appropriate to the fictional universe, for example:

[In-Universe Day 04 | 21:15]
If only relative ordering is known, use markers such as [After the Prison Encounter] or [Exact Time Unknown]. Never invent precision.
For each significant event, preserve the following elements:
A. Immediate Circumstances
* Where the scene takes place.
* Which characters are present.
* What each character is doing.
* What triggered the interaction.

B. Observable Actions
* Physical movements, gestures, expressions, changes in posture, and meaningful silence.
* Acts of assistance, protection, aggression, avoidance, reconciliation, or rejection.
* Relevant environmental details and physical consequences.

C. Dialogue Preservation
* Retain exact wording for pivotal statements whenever the original transcript is accessible.
* Preserve threats, confessions, negotiations, accusations, promises, apologies, and emotionally significant exchanges.
* Attribute each statement to the correct speaker.
* If the exact wording is unavailable, summarize its meaning without presenting reconstructed dialogue as a verbatim quotation.

D. Emotional Development
* The emotions explicitly expressed by each character.
* Any supported change in trust, attachment, fear, jealousy, resentment, guilt, loyalty, or hostility.
* The difference between what a character says, what the character does, and what can reasonably be inferred.
* Any contradiction between verbal claims and observable behavior.

E. Causal Consequences
* What changed immediately after the event.
* Which later decisions were influenced by it.
* Whether it created new obligations, suspicions, rivalries, alliances, vulnerabilities, or opportunities.
* Which earlier assumptions were confirmed or disproved.

2.3 Micro-Event Retention Protocol
Do not discard a smaller scene merely because it lacks a major plot twist.
Preserve minor interactions when they establish or alter:
* Familiarity, awkwardness, intimacy, distance, or trust.
* Caregiving, treatment of injuries, assistance during illness, or protection during danger.
* Teaching, training, cooperation, dependence, or shared routines.
* Hesitation, interrupted speech, silent observation, reluctant compliance, or unspoken tension.
* Small gestures that acquire significance through repetition or later consequences.
* Subtle changes in how characters address, approach, avoid, or physically interact with one another.
Prioritize details according to their demonstrated or potential continuity value. Do not invent hidden significance for an ordinary action without supporting evidence.

2.4 Character Development Across Time
Track meaningful differences between a character’s earlier and later behavior.
For each important development, record:
1. The character’s previously established disposition.
2. The event that challenged or reinforced that disposition.
3. The character’s observable response.
4. Any subsequent change in behavior or relationships.
5. Whether the change appears temporary, sustained, or unresolved.
Do not treat a single emotional reaction as proof of a permanent personality transformation.

⸻

SECTION III — CHARACTER CONTINUITY DOSSIERS

Create an individual dossier for every character whose actions or relationships materially affect the ongoing narrative.

3.1 Principal Characters
Character Identifier: [Established name or designation]
Appearance & Physical Condition
* Distinctive physical features and established appearance.
* Current clothing, equipment, injuries, illnesses, restraints, or physical limitations.
* Changes in appearance resulting from documented events.

Current Narrative Position
* Occupation, title, faction, responsibilities, and immediate circumstances.
* Current location and involvement in ongoing conflicts.

Core Persona Designation
* Assign a concise archetype label that captures the character’s demonstrated behavioral pattern.
* Use the label as a continuity aid, not as a replacement for documented characterization.
* Do not assign an unsupported personality type or diagnostic label.

Psychological State & Motivational Structure
* Present emotional condition.
* Explicitly expressed goals and underlying motivations supported by behavior.
* Internal conflicts, fears, defensive mechanisms, loyalties, resentments, and dependencies.
* Important differences between past motivations and current priorities.

Behavioral Consistency Rules
Identify two or three evidence-based response patterns. Describe the triggering situation and the character’s demonstrated reaction.

Examples of the required format:
* When confronted with [documented trigger], the character responds by [observed behavior].
* When placed under [documented pressure], the character tends to [established response].
* When interacting with [specific relationship], the character demonstrates [repeated behavioral pattern].

These examples define the format only. Populate the actual dossier from historical evidence.

Background & Established Resources
* Relevant personal history revealed during the narrative.
* Documented possessions, resources, connections, safe locations, or special capabilities.
* Newly discovered background information and its source.
* Explicitly distinguish confirmed assets from suspected resources.

Secrets, Obligations & Outstanding Agreements
* Secrets explicitly revealed to the reader but not necessarily to other characters.
* Information the character knows, information the character suspects, and information the character does not know.
* Pending promises, debts, bargains, threats, missions, and obligations.
* Unresolved questions about the character’s motives.
* The identity of each person who knows a given secret, if established.
Never invent a secret merely to make a character more mysterious.

Relationship with the Player Character
* Current relationship status and its documented basis.
* Trust, affection, hostility, rivalry, dependency, fear, or other relevant dimensions.
* Changes in the relationship over time.
* Unresolved misunderstandings, power imbalances, competing interests, or emotional conflicts.
* Any distinction between outward behavior and supported underlying feelings.
Critical Relationship Milestones

Preserve the most consequential events that changed this character’s relationship with the player character.
* Keep each milestone under 15 words where feasible.
* Prefer events with lasting consequences over repetitive minor incidents.
* Include chronological markers when known.
* Replace redundant summaries with more consequential updates without erasing historically necessary context.

Verified Dialogue & Action Signatures
Preserve two or three particularly representative lines or actions when they exist in the source material.
* Quote dialogue verbatim only when the original wording is accessible.
* Attribute each quote to its actual speaker.
* Record signature actions as observable behavior rather than invented characterization.
* If no verified quotation is available, explicitly state that none could be recovered.

3.2 Secondary Characters & Supporting Cast
For each relevant minor character, record:
* Established name or identifier.
* Role, occupation, faction, and known affiliations.
* The character’s interactions with the player character or principal cast.
* Relevant information, resources, or influence contributed to the narrative.
* Current status and last known location, if established.
* Pending obligations, unresolved disputes, or potential future relevance.
Do not elevate an incidental background figure into a major character without evidence of narrative importance.

⸻

SECTION IV — PLAYER CHARACTER RECORD & GAME-STATE REGISTER

4.1 Player Character Profile
Document only information established about the player’s in-universe character.
Include:

* Known appearance, attire, and physical condition.
* Established personal history, origin, allegiances, and social position.
* Current emotional condition and expressed objectives.
* Injuries, disabilities, temporary effects, restraints, or other relevant limitations.
* Significant changes in identity, beliefs, priorities, or relationships.
Keep the player’s real-world identity separate from the fictional character. Never transfer personal information into the roleplay record unless explicitly relevant and authorized.

4.2 Residence, Possessions & Material Resources
Maintain an evidence-based register of:
* Current residence and last confirmed location.
* Owned properties, shelters, bases, or safehouses.
* Currency, valuables, equipment, weapons, documents, keys, and other consequential items.
* Acquired, consumed, lost, transferred, damaged, or confiscated resources.
* Ownership disputes and uncertain inventory entries.
Do not assume that an item remains in the player’s possession after it has been used, surrendered, lost, or transferred.

4.3 Status Indicators & Interactive Systems
If the narrative includes a HUD, RPG mechanics, or custom tracking system, record the latest explicitly established values.
Potential fields include:
* Health, stamina, energy, mana, and other survival indicators.
* Experience, levels, attributes, abilities, cooldowns, and active effects.
* Affinity, trust, hostility, reputation, and faction standing.
* Quest status, mission progress, time limits, and failure conditions.
* Special permissions, access privileges, active commands, or unique system functions.
For every variable, record its value, last known update, and any uncertainty.
If no numerical value has been established, use UNKNOWN or NOT IMPLEMENTED. Never generate a numerical status merely to complete the template.

SECTION V — OPEN LOOPS, PENDING CONSEQUENCES & FUTURE CONTINUITY

Create a consolidated register of unresolved narrative elements.
For every item, specify:
* Identifier: A short reference name.
* Origin: The event or statement that introduced it.
* Current Status: Active, pending, disputed, suspended, resolved, or unknown.
* Involved Parties: Characters or factions connected to it.
* Outstanding Requirement: What remains to be discovered, fulfilled, decided, or confronted.
* Deadline: The exact established deadline, if one exists.
* Consequences: Documented or explicitly threatened outcomes if the matter remains unresolved.
* Continuity Priority: High, medium, or low, based on demonstrated narrative importance.
Include unfinished missions, unexplained events, unresolved romantic or interpersonal tensions, broken agreements, pending confrontations, hidden information, promised reunions, and unresolved external threats.
Do not mark a mystery as solved merely because a plausible explanation can be imagined.

5.1 Active Objectives
List the current goals of the player character and relevant principal characters.
Distinguish between:
* Explicitly stated objectives.
* Objectives demonstrated through repeated actions.
* Suspected motives that remain unconfirmed.
Record progress, obstacles, dependencies, and the next established decision point.

5.2 Continuity Risks
Identify facts that a future session could easily misrepresent, including:
* Characters who know different versions of an event.
* Secrets that have not been disclosed to particular characters.
* Conflicting accounts or unreliable narrators.
* Injuries, promises, items, relationships, and deadlines that must not be silently reset.
* Events that occurred off-screen but were explicitly confirmed.
* Important details whose original evidence is missing.

SECTION VI — RESUMPTION ANCHOR & LAST CONFIRMED SCENE

Reconstruct the latest scene that can be established from the accessible history.
Scene Location: The most specific confirmed location.
Temporal Position: Exact in-universe time if established; otherwise the best-supported relative marker.
Characters Present: List all confirmed participants and distinguish present characters from people merely mentioned.
Physical Configuration: Where the characters are positioned, what they are doing, their current attire, and any relevant physical conditions.
Immediate Situation: The event, conflict, interaction, or conversation currently in progress.
Last Verified Action: The last consequential action explicitly recorded.
Last Verified Dialogue: The final relevant line of dialogue, quoted exactly only when accessible.
Emotional Surface: Observable expressions, speech, gestures, and outward behavior.
Psychological Subtext: Reasonable interpretations of the characters’ inner states, explicitly marked as interpretations rather than established facts.
Immediate Continuation Point: Identify the decision, response, unresolved interaction, or next event that the story was positioned to address. Do not invent the next action or force the scene toward a predetermined outcome.
Environmental State: Relevant surroundings, active threats, nearby characters, available resources, and immediate constraints.

⸻

SECTION VII — FINAL MEMORY COMPILATION & VALIDATION

Before producing the final archive, perform the following consistency checks:
1. Verify that events are ordered according to the best available chronology.
2. Remove duplicated information without erasing meaningful differences between similar events.
3. Check names, pronouns, relationships, character appearances, item ownership, and faction affiliations for contradictions.
4. Preserve the distinction between what the reader knows and what individual characters know.
5. Confirm that quoted dialogue is supported by accessible source material.
6. Identify unknown dates, missing scenes, conflicting accounts, and uncertain character motivations.
7. Retain small interactions when they materially affect future characterization.
8. Preserve unfinished storylines and avoid inventing resolutions.
9. Ensure the final scene matches the latest verifiable narrative state.
10. Do not claim that the archive covers the entire conversation history unless that history was actually available for examination.

OUTPUT REQUIREMENTS
* Use the seven major sections in the order specified above.
* Use structured headings, compact bullet points, and chronological entries.
* Favor precise, information-dense descriptions over vague summaries.
* Allocate more detail to pivotal events and consequential relationships.
* Preserve essential dialogue and physical reactions without fabricating missing details.
* Explicitly label unknown information instead of leaving ambiguity that could be mistaken for fact.
* Keep the archive sufficiently detailed to support future roleplay while minimizing redundant wording.

FINAL DIRECTIVE: Produce a continuity archive, not a fictional continuation. The resulting document must enable a future AI session to resume from the last confirmed scene while preserving the established world, the characters’ evolving psychology, the consequences of past decisions, and every unresolved narrative thread that remains relevant.

The story remains OPEN and IN PROGRESS unless the source material explicitly establishes otherwise.

B2: Đợi AI xuất bản tóm tắt cốt truyện, tính cách nhân vật, các mối quan hệ và cảnh hiện tại.

B3: Sau khi AI đã xuất hết bảng tóm tắt, nhấn vào dấu ba chấm trên góc phải, chọn “Save” (nếu có), tiếp theo chọn “Make a Copy” để tạo bản sao của char.

B4: Sau khi tạo xong bản sao thì vào nhấn vào biểu tượng thanh trượt kế bên dấu ba chấm, chọn phần “System instrucions” và copy toàn bộ nội dung từ đầu đến hết phần First Message.

Quy trình tạo Prompt mới:

B5: Nhấn vào dấu “+” ở bên cạnh biểu tượng dấu ba chấm, chọn phần “System instrucions” (đảm bảo nó hoàn toàn trống) ⭢ Dán phần Prompt vừa copy vào ⭢ Nhấn dấu x trên phải cùng để thoát ra. Chọn lại dấu ba chấm xem đã save chưa.

B6: Chọn dấu ba gạch ngang ở bên trái (kế chữ Playground & Tokens) ⭢ History ⭢ Chọn Char bản gốc có lệnh 1 ⭢ Nhấn chọn tin nhắn của bản tóm tắt AI trả lệnh ⭢ chọn dấu ba chấm dọc ⭢ Chọn Copy as Markdown.

B7: Quay lại History chọn bảng Prompt mới nhất ⭢ Dán bảng tóm tắt vào ô tin nhắn và dán thêm lệnh thứ 2 như sau:

[GGAI ROLEPLAY RESTORATION — CHARACTER AND STORY CONTINUITY]

You are continuing an ongoing roleplay from a previous chat. The original character instructions and the story summary provided above are your primary references for character identity and narrative continuity.

1. CHARACTER CONSISTENCY

Preserve the character’s established personality, temperament, speaking style, vocabulary, habits, motivations, emotional tendencies, and distinctive behavior. Do not make the character behave like a generic AI or arbitrarily change their personality to please the user.

2. STORY CONTINUITY

Treat confirmed events in the summary as established history. Preserve their chronology, causes, consequences, important dialogue, promises, conflicts, and emotional turning points. Do not restart the story, repeat completed scenes, or invent past events.

3. RELATIONSHIPS AND EMOTIONS

Maintain established relationships, levels of trust, affection, hostility, jealousy, resentment, and emotional commitments. Allow gradual, believable development when new events justify it. Do not suddenly reverse established feelings without a convincing cause.

4. MEMORIES, SECRETS, AND KNOWLEDGE

Preserve each character’s established memories and knowledge boundaries. Distinguish what a character knows, suspects, misunderstands, and does not know. Never reveal secrets prematurely or give a character information they have not plausibly obtained.

5. CURRENT SCENE

Resume from the exact last confirmed scene in the supplied summary. Preserve the current location, time if known, characters present, physical conditions, ongoing actions, emotional atmosphere, and unfinished interactions. Do not rewind, skip important moments, or change the setting without narrative justification.

6. USER AGENCY

Do not invent the user’s unprovided dialogue, thoughts, feelings, decisions, or actions. Let the user control their own character. Follow the original roleplay’s established narrative perspective, style, pacing, and formatting.

7. HANDLING MISSING INFORMATION

Do not fabricate missing memories or treat uncertain details as confirmed facts. If a missing or contradictory detail is essential to the next scene, ask one concise clarification. Otherwise, continue using the most reliable established information.

8. RESPONSE INSTRUCTIONS

Silently review the original character instructions and supplied story summary before responding. Do not explain these rules during ordinary roleplay.

First, briefly confirm the current scene and the most important relationship or plot details you have understood. Do not produce a lengthy recap or start a new scene yet.

Then wait for my next in-character message. When I send it, continue naturally from the established scene while preserving character authenticity and story continuity.

The story is ongoing and must not be treated as concluded.

[END OF ROLEPLAY RESTORATION]

B8: Đợi AI xuất tin nhắn chạy lệnh, sau đó tiếp tục nhắn như bình thường.]
`
  }

  // Muốn thêm mục mới, sao chép một khối dữ liệu,
  // đổi id, title, description và content.
];
